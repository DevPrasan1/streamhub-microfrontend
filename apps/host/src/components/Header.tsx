import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore, useUIStore } from '@mfe/shared-store';
import { Button, Avatar, Search, Dropdown } from '@mfe/shared-ui';

export default function Header() {
  const { user } = useAuthStore();
  const { cartItems, clearCart, removeFromCart } = useCartStore();
  const { theme, toggleTheme, toggleSidebar, setSearchQuery } = useUIStore();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert(`Checkout Completed Successfully!\nTotal Paid: $${totalPrice.toFixed(2)}`);
    clearCart();
  };

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
          <span className={`bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent`}>
            MFE Shop
          </span>
        </Link>
      </div>

      <div className="w-96 max-w-full hidden md:block">
        <Search placeholder="Search catalog brand or name..." onSearch={setSearchQuery} />
      </div>

      <div className="flex items-center gap-4">
        {/* Cart Dropdown */}
        <Dropdown
          menuClassName="w-72"
          label={
            <div className="flex items-center gap-2 relative">
              <span>🛒</span>
              <span className="hidden sm:inline font-medium text-sm">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </div>
          }
        >
          <div className="p-4 flex flex-col gap-3 text-zinc-800 dark:text-zinc-200">
            <h4 className="font-bold text-sm border-b border-zinc-200 dark:border-zinc-800 pb-2 flex justify-between items-center">
              <span>Shopping Cart</span>
              <span className="text-zinc-500 text-xs font-normal">({totalItems} items)</span>
            </h4>
            {cartItems.length > 0 ? (
              <>
                <div className="flex flex-col gap-3 max-h-48 overflow-y-auto no-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.product.thumbnail}
                          alt=""
                          className="w-8 h-8 rounded bg-zinc-950 object-cover shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold truncate">{item.product.title}</span>
                          <span className="text-[10px] text-zinc-550 dark:text-zinc-500">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-indigo-500 dark:text-indigo-400">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-400 transition font-bold"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between items-center font-bold text-sm">
                  <span>Total Price:</span>
                  <span className="text-indigo-500 dark:text-indigo-400">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="primary" className="flex-1 py-2 text-xs font-bold" onClick={handleCheckout}>
                    Checkout
                  </Button>
                  <Button variant="secondary" className="py-2 px-3 text-xs" onClick={clearCart}>
                    Clear
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-zinc-500 text-xs">Your cart is empty.</div>
            )}
          </div>
        </Dropdown>

        {user ? (
          <Link
            to="/profile"
            className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition duration-150"
            title="Profile Settings"
          >
            <Avatar name={user.displayName} src={user.photoURL} />
            <span className="text-sm font-medium hidden sm:inline">{user.displayName}</span>
          </Link>
        ) : (
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg text-lg transition ${
            theme === 'dark' ? 'hover:bg-zinc-900 text-amber-400' : 'hover:bg-zinc-150 text-indigo-600'
          }`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
