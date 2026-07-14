export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
}

export interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  category?: string;
  country?: string;
  language?: string;
  description?: string;
}

export interface Comment {
  id: string;
  channelId: string;
  uid: string;
  userName: string;
  message: string;
  createdAt: any; // Firestore Timestamp or date string
}

export interface Favorite {
  uid: string;
  channelIds: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  flag?: string;
}

export interface PlaybackStats {
  bufferedTime: number;
  droppedFrames: number;
  resolution: string;
}
