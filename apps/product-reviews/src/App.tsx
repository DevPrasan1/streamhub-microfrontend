import React, { useState, useEffect } from 'react';
import { useAuthStore, useProductStore, useUIStore } from '@mfe/shared-store';
import { Comment } from '@mfe/shared-types';
import { db, collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc } from '@mfe/mock-api';
import ReviewHeader from './components/ReviewHeader';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

export default function App() {
  const { user } = useAuthStore();
  const { selectedProduct } = useProductStore();
  const { theme } = useUIStore();
  const [reviews, setReviews] = useState<Comment[]>([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const productId = selectedProduct?.id || 0;

  useEffect(() => {
    if (productId === 0) {
      setReviews([]);
      return;
    }

    const q = query(collection(db, 'reviews'), where('productId', '==', productId), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const list: Comment[] = [];
      snapshot.docs.forEach((doc: any) => {
        list.push(doc.data());
      });
      setReviews(list);
    });

    return () => unsubscribe();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim() || !user || productId === 0) return;

    try {
      await addDoc(collection(db, 'reviews'), {
        productId: productId,
        uid: user.uid,
        userName: user.displayName || user.email.split('@')[0],
        message: newReviewText.trim(),
        createdAt: new Date().toISOString(),
      });
      setNewReviewText('');
    } catch (err) {
      console.error('Failed to post review:', err);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch (err) {
      console.error('Failed to delete review:', err);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
  });

  if (productId === 0) {
    return (
      <div
        className={`p-6 rounded-xl border text-center text-zinc-500 ${
          theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
        }`}
      >
        Select a product to view reviews.
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-6 p-6 rounded-xl border transition duration-200 ${
        theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'
      }`}
    >
      <ReviewHeader count={reviews.length} sortBy={sortBy} onChangeSort={setSortBy} theme={theme} />

      <ReviewForm
        text={newReviewText}
        onChangeText={setNewReviewText}
        onSubmit={handleSubmit}
        isLoggedIn={!!user}
        theme={theme}
      />

      <ReviewList reviews={sortedReviews} currentUserId={user?.uid} onDelete={handleDelete} theme={theme} />
    </div>
  );
}
