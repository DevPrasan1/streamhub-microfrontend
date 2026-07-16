import React from 'react';
import { Product, Comment } from '@mfe/shared-types';

export * from './Button';
export * from './Card';
export * from './Badge';
export * from './Avatar';

// --- Search Input Component ---
export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}
export const Search: React.FC<SearchProps> = ({ className = '', onSearch, ...props }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className={`w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 px-4 py-2 pl-10 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition ${className}`}
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
      <div className="absolute left-3 top-2.5 text-zinc-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

// --- Dropdown Component ---
export interface DropdownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  menuClassName?: string;
}
export const Dropdown: React.FC<DropdownProps> = ({ label, children, className = '', menuClassName = 'w-56' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-150 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
      >
        {label}
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${menuClassName}`}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

// --- Tabs Component ---
export interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}
export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex border-b border-zinc-200 dark:border-zinc-800 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition duration-200 ${
            activeTab === tab.id
              ? 'border-indigo-500 text-indigo-650 dark:text-indigo-400'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// --- Tooltip Component ---
export interface TooltipProps {
  content: string;
  children: React.ReactNode;
}
export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white dark:bg-zinc-950 text-xs text-zinc-850 dark:text-zinc-100 rounded shadow-md whitespace-nowrap pointer-events-none z-50 border border-zinc-200 dark:border-zinc-800">
        {content}
      </div>
    </div>
  );
};

// --- Modal Component ---
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative z-10 text-zinc-900 dark:text-zinc-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Spinner Component ---
export const Spinner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`animate-spin rounded-full h-8 w-8 border-2 border-zinc-300 dark:border-zinc-700 border-t-indigo-500 ${className}`}
    ></div>
  );
};

// --- ProductCard Component ---
export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, className = '' }) => {
  return (
    <div
      onClick={() => onClick?.(product)}
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:scale-[1.02] hover:shadow-md transition duration-200 flex flex-col group ${className}`}
    >
      <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-4xl text-zinc-700">📦</span>
        )}
        <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
          ${product.price}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">{product.category}</span>
        <h4 className="font-semibold text-sm text-zinc-800 dark:text-zinc-100 mt-1 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
          {product.title}
        </h4>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center gap-1 mt-3">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-zinc-650 dark:text-zinc-350 text-xs font-medium">{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

// --- ReviewCard Component ---
export interface ReviewCardProps {
  review: Comment;
  onDelete?: (id: string) => void;
  currentUserId?: string;
  className?: string;
}
export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete, currentUserId, className = '' }) => {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex gap-3 ${className}`}
    >
      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center font-semibold text-sm shrink-0">
        {review.userName ? review.userName[0].toUpperCase() : '?'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-medium text-sm text-zinc-800 dark:text-zinc-100">{review.userName}</span>
            <span className="text-[10px] text-zinc-500">{new Date(review.createdAt).toLocaleString()}</span>
          </div>
          {currentUserId === review.uid && onDelete && (
            <button
              onClick={() => onDelete(review.id)}
              className="text-zinc-500 hover:text-red-500 transition text-xs shrink-0"
            >
              Delete
            </button>
          )}
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-1 leading-relaxed">{review.message}</p>
      </div>
    </div>
  );
};
