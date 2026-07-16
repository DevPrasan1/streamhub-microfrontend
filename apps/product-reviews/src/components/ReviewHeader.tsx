import React from 'react';

interface ReviewHeaderProps {
  count: number;
  sortBy: 'newest' | 'oldest';
  onChangeSort: (sortBy: 'newest' | 'oldest') => void;
  theme: string;
}

export default function ReviewHeader({ count, sortBy, onChangeSort, theme }: ReviewHeaderProps) {
  return (
    <div
      className={`flex justify-between items-center pb-4 border-b ${
        theme === 'dark' ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
        Reviews & Ratings ({count})
      </h3>
      <select
        value={sortBy}
        onChange={(e: any) => onChangeSort(e.target.value)}
        className={`border rounded px-2 py-1 text-xs focus:outline-none cursor-pointer ${
          theme === 'dark' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-300'
        }`}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}
