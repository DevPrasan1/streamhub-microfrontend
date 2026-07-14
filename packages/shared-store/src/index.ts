import { create } from 'zustand';
import { User, Channel } from '@streamhub/shared-types';

// --- AUTH STORE ---
interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

// --- PLAYER STORE ---
interface PlayerState {
  selectedChannel: Channel | null;
  volume: number; // 0 to 1
  isPlaying: boolean;
  playbackRate: number;
  setSelectedChannel: (channel: Channel | null) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPlaybackRate: (playbackRate: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  selectedChannel: null,
  volume: 1.0,
  isPlaying: false,
  playbackRate: 1.0,
  setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlaybackRate: (playbackRate) => set({ playbackRate }),
}));

// --- UI STORE ---
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  searchQuery: string;
  language: string;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setLanguage: (language: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  searchQuery: '',
  language: 'en',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLanguage: (language) => set({ language }),
}));
export type { AuthState, PlayerState, UIState };
