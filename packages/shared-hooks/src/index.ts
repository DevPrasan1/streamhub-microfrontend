import { useEffect, useState } from 'react';
import { useAuthStore, usePlayerStore, useUIStore } from '@mfe/shared-store';

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();
  return { user, loading, setUser, setLoading };
}

export function usePlayer() {
  const {
    selectedChannel,
    volume,
    isPlaying,
    playbackRate,
    setSelectedChannel,
    setVolume,
    setIsPlaying,
    setPlaybackRate,
  } = usePlayerStore();

  return {
    selectedChannel,
    volume,
    isPlaying,
    playbackRate,
    setSelectedChannel,
    setVolume,
    setIsPlaying,
    setPlaybackRate,
  };
}

export function useTheme() {
  const { theme, toggleTheme, setTheme } = useUIStore();
  return { theme, toggleTheme, setTheme };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useFirestore() {
  // Placeholder for firestore subscription/querying logic
  return {};
}

export function useSearch() {
  const { searchQuery, setSearchQuery } = useUIStore();
  return { searchQuery, setSearchQuery };
}
