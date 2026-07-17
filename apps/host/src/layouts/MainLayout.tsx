import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore, useUIStore } from '@mfe/shared-store';
import { auth, onAuthStateChanged } from '@mfe/mock-api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  const { theme } = useUIStore();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (mockUser: any) => {
      if (mockUser) {
        setUser({
          uid: mockUser.uid,
          displayName: mockUser.displayName,
          email: mockUser.email || '',
          photoURL: mockUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        body.classList.add('dark');
        body.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        body.classList.add('light');
        body.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    }
  }, [theme]);

  return (
    <div
      className={`h-screen flex flex-col ${
        theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
      }`}
    >
      {/* Header */}
      <Header />

      {/* Main Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto min-w-[300px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
