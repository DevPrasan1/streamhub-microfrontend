import React from 'react';
import { useUIStore } from '@mfe/shared-store';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg text-lg transition ${
        theme === 'dark' ? 'hover:bg-zinc-900 text-amber-400' : 'hover:bg-zinc-150 text-indigo-600'
      }`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
