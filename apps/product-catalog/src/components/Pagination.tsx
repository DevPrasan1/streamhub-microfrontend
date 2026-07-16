import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, totalItems, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 bg-white dark:bg-zinc-900/40 px-6 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
      >
        ← Previous
      </button>

      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
        Page <span className="text-zinc-800 dark:text-zinc-200">{currentPage}</span> of{' '}
        <span className="text-zinc-800 dark:text-zinc-200">{totalPages}</span>
        <span className="hidden sm:inline"> ({totalItems} items total)</span>
      </span>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
      >
        Next →
      </button>
    </div>
  );
}
