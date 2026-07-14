import { create } from 'zustand';
import { User, Channel } from '@streamhub/shared-types';

// --- AUTH STORE ---
interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const getAuthStore = () => {
  const key = '__streamhub_auth_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<AuthState>((set) => ({
        user: null,
        loading: true,
        setUser: (user) => set({ user }),
        setLoading: (loading) => set({ loading }),
      }));
    }
    return (window as any)[key];
  }
  return create<AuthState>((set) => ({
    user: null,
    loading: true,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
  }));
};

export const useAuthStore = getAuthStore();

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

const getPlayerStore = () => {
  const key = '__streamhub_player_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<PlayerState>((set) => ({
        selectedChannel: null,
        volume: 1.0,
        isPlaying: false,
        playbackRate: 1.0,
        setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
        setVolume: (volume) => set({ volume }),
        setIsPlaying: (isPlaying) => set({ isPlaying }),
        setPlaybackRate: (playbackRate) => set({ playbackRate }),
      }));
    }
    return (window as any)[key];
  }
  return create<PlayerState>((set) => ({
    selectedChannel: null,
    volume: 1.0,
    isPlaying: false,
    playbackRate: 1.0,
    setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
    setVolume: (volume) => set({ volume }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setPlaybackRate: (playbackRate) => set({ playbackRate }),
  }));
};

export const usePlayerStore = getPlayerStore();

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

const getUIStore = () => {
  const key = '__streamhub_ui_store__';
  if (typeof window !== 'undefined') {
    if (!(window as any)[key]) {
      (window as any)[key] = create<UIState>((set) => ({
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
    }
    return (window as any)[key];
  }
  return create<UIState>((set) => ({
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
};

export const useUIStore = getUIStore();
export type { AuthState, PlayerState, UIState };
