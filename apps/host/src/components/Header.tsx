import React from 'react';
import { Link } from 'react-router-dom';
import { useUIStore } from '@mfe/shared-store';
import { Search } from '@mfe/shared-ui';
import CartDropdown from './CartDropdown';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { theme, toggleSidebar, setSearchQuery } = useUIStore();

  return (
    <header
      className={`h-16 border-b px-6 flex items-center justify-between shrink-0 sticky top-0 z-40 backdrop-blur-md ${
        theme === 'dark' ? 'border-zinc-800 bg-zinc-950/80' : 'border-zinc-200 bg-white/80'
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-zinc-450 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-wider">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <span
            className={`bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hidden sm:inline`}
          >
            MFE Shop
          </span>
        </Link>
      </div>

      <div className="w-96 max-w-full hidden md:block">
        <Search placeholder="Search catalog brand or name..." onSearch={setSearchQuery} />
      </div>

      <div className="flex items-center gap-4">
        {/* Cart Dropdown */}
        <CartDropdown />

        {/* User Profile / Login */}
        <UserMenu />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
