// --- Mock REST API Integration Package ---
// Emulates Firestore/Auth client structures using public REST endpoints (dummyjson.com).
// Maps mock fields to modern e-commerce formats (Product reviews and carts).

import { Comment } from '@mfe/shared-types';

class MockAuth {
  private listeners: ((user: any) => void)[] = [];
  currentUser: any = null;

  constructor() {
    const saved = localStorage.getItem('mfe_mock_user');
    this.currentUser = saved ? JSON.parse(saved) : null;
  }

  onAuthStateChanged(callback: (user: any) => void) {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  _triggerChange() {
    this.listeners.forEach((l) => l(this.currentUser));
  }
}

export const auth = new MockAuth();

export const onAuthStateChanged = (authInstance: any, callback: any) => {
  return authInstance.onAuthStateChanged(callback);
};

// Helper to fetch dummy user from REST API
async function fetchDummyUser(userId: number = 1) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);
    const data = await res.json();
    return {
      uid: `dummy-user-${data.id}`,
      email: data.email,
      displayName: `${data.firstName} ${data.lastName}`,
      photoURL:
        data.image ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    };
  } catch (error) {
    return {
      uid: 'google-user-123',
      email: 'guest.user@example.com',
      displayName: 'Guest User',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    };
  }
}

export const signInWithPopup = async (authInstance: any, provider: any) => {
  const mockUser = await fetchDummyUser(1); // Fetch Emily Johnson
  authInstance.currentUser = mockUser;
  localStorage.setItem('mfe_mock_user', JSON.stringify(mockUser));
  authInstance._triggerChange();
  return { user: mockUser };
};

export const signInWithEmailAndPassword = async (authInstance: any, email: string, pass: string) => {
  const userId = (email.length % 30) + 1;
  const mockUser = await fetchDummyUser(userId);
  authInstance.currentUser = mockUser;
  localStorage.setItem('mfe_mock_user', JSON.stringify(mockUser));
  authInstance._triggerChange();
  return { user: mockUser };
};

export const createUserWithEmailAndPassword = async (authInstance: any, email: string, pass: string) => {
  return signInWithEmailAndPassword(authInstance, email, pass);
};

export const signOut = async (authInstance: any) => {
  authInstance.currentUser = null;
  localStorage.removeItem('mfe_mock_user');
  authInstance._triggerChange();
};

export const googleProvider = {};

// --- Mock Firestore REST DB ---
export const db = {};

interface Listener {
  queryKey: number;
  callback: (snapshot: { docs: any[] }) => void;
}
let activeListeners: Listener[] = [];

// Local cache to store comments per productId, loaded from REST API
const commentsCache: Record<number, Comment[]> = {};

async function loadCommentsFromRest(productId: number) {
  if (commentsCache[productId]) {
    return commentsCache[productId];
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();

    const mapped: Comment[] = (data.reviews || []).map((r: any, index: number) => ({
      id: `rest-review-${productId}-${index}`,
      productId: productId,
      uid: `reviewer-${r.reviewerEmail}`,
      userName: r.reviewerName,
      message: `★ ${r.rating}/5 - ${r.comment}`,
      createdAt: r.date || new Date(Date.now() - (index + 1) * 3600000).toISOString(),
    }));

    commentsCache[productId] = mapped;
    return mapped;
  } catch (e) {
    commentsCache[productId] = [];
    return [];
  }
}

function notifyListeners(productId: number) {
  const list = commentsCache[productId] || [];
  activeListeners.forEach((listener) => {
    if (listener.queryKey === productId) {
      listener.callback({
        docs: list.map((c) => ({
          id: c.id,
          data: () => c,
        })),
      });
    }
  });
}

export const collection = (database: any, name: string) => {
  return { name };
};

export const query = (colRef: any, ...constraints: any[]) => {
  const whereConstraint = constraints.find((c) => c && c.type === 'where' && c.field === 'productId');
  const productId = whereConstraint ? Number(whereConstraint.value) : 1;
  return { colRef, productId };
};

export const where = (field: string, op: string, value: any) => {
  return { type: 'where', field, op, value };
};

export const orderBy = (field: string, direction: string) => {
  return { type: 'orderBy', field, direction };
};

export const onSnapshot = (queryObj: any, callback: any) => {
  const productId = queryObj.productId;
  const listener = {
    queryKey: productId,
    callback,
  };
  activeListeners.push(listener);

  loadCommentsFromRest(productId).then((comments) => {
    callback({
      docs: comments.map((c: any) => ({
        id: c.id,
        data: () => c,
      })),
    });
  });

  return () => {
    activeListeners = activeListeners.filter((l) => l !== listener);
  };
};

export const addDoc = async (colRef: any, data: any) => {
  const productId = Number(data.productId) || 1;

  try {
    const res = await fetch('https://dummyjson.com/comments/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: data.message,
        postId: 3,
        userId: 5,
      }),
    });
    const restData = await res.json();

    const newComment: Comment = {
      id: `rest-comment-${restData.id}-${Date.now()}`,
      productId: productId,
      uid: data.uid || 'guest-123',
      userName: data.userName || 'Guest',
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    if (!commentsCache[productId]) {
      commentsCache[productId] = [];
    }
    commentsCache[productId].push(newComment);
    notifyListeners(productId);
    return { id: newComment.id };
  } catch (e) {
    const newComment: Comment = {
      id: `local-comment-${Date.now()}`,
      productId: productId,
      uid: data.uid || 'guest-123',
      userName: data.userName || 'Guest',
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    if (!commentsCache[productId]) {
      commentsCache[productId] = [];
    }
    commentsCache[productId].push(newComment);
    notifyListeners(productId);
    return { id: newComment.id };
  }
};

export const doc = (database: any, collectionName: string, id: string) => {
  return { collectionName, id };
};

export const deleteDoc = async (docRef: any) => {
  const commentId = docRef.id;

  try {
    if (commentId.startsWith('rest-comment-')) {
      await fetch(`https://dummyjson.com/comments/${commentId.replace('rest-comment-', '')}`, {
        method: 'DELETE',
      });
    }
  } catch (e) {
    // Proceed to delete locally
  }

  Object.keys(commentsCache).forEach((key) => {
    const productId = Number(key);
    const list = commentsCache[productId];
    const filtered = list.filter((c) => c.id !== commentId);
    if (filtered.length !== list.length) {
      commentsCache[productId] = filtered;
      notifyListeners(productId);
    }
  });
};

export class EmailAuthProvider {}
