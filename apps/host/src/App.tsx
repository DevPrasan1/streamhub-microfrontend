import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore, useUIStore } from '@mfe/shared-store';
import { Avatar, Button } from '@mfe/shared-ui';
import { auth, signOut } from '@mfe/mock-api';
import MainLayout from './layouts/MainLayout';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import DiscoverProductsPage from './pages/DiscoverProductsPage';

function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { theme } = useUIStore();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>
        Profile Settings
      </h2>
      {user ? (
        <div
          className={`p-6 rounded-xl border max-w-md ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-850'
          }`}
        >
          <div className="flex items-center gap-4">
            <Avatar name={user.displayName} src={user.photoURL} className="w-16 h-16 text-xl" />
            <div>
              <h3 className="font-semibold text-lg">{user.displayName}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}>{user.email}</p>
            </div>
          </div>
          <Button
            variant="danger"
            className="mt-6 w-full"
            onClick={async () => {
              try {
                await signOut(auth);
                setUser(null);
                navigate('/');
              } catch (err) {
                console.error('Sign out failed:', err);
              }
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}>
          Please sign in to view your profile settings.
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DiscoverProductsPage />} />
          <Route path="/category/:categoryName" element={<DiscoverProductsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
