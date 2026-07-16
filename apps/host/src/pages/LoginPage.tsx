import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@mfe/shared-store';
import { Button } from '@mfe/shared-ui';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@mfe/mock-api';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { theme } = useUIStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-in failed');
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div
        className={`p-8 max-w-md w-full border rounded-xl shadow-sm dark:shadow-2xl transition duration-200 ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'
        }`}
      >
        <h2 className={`text-2xl font-bold text-center mb-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className={`text-sm text-center mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}>
          {isSignUp ? 'Join community and sync orders' : 'Sign in to access your profile settings'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg p-3 mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className={`block text-xs font-semibold mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition border ${
                theme === 'dark'
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-550'
                  : 'bg-zinc-50 border-zinc-250 text-zinc-800 placeholder-zinc-400'
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-xs font-semibold mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition border ${
                theme === 'dark'
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-550'
                  : 'bg-zinc-50 border-zinc-250 text-zinc-800 placeholder-zinc-400'
              }`}
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className={`px-2 ${theme === 'dark' ? 'bg-zinc-900 text-zinc-500' : 'bg-white text-zinc-400'}`}>
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="secondary" className="w-full" onClick={handleGoogleSignIn}>
            Sign In with Google
          </Button>
        </div>

        <p className="text-xs text-center text-zinc-500 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-650 dark:text-indigo-400 hover:underline font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
