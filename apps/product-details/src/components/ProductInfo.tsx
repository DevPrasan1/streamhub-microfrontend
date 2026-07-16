import React from 'react';

interface ProductInfoProps {
  brand?: string;
  category: string;
  title: string;
  rating: number;
  stock: number;
  description: string;
  theme: string;
}

export default function ProductInfo({ brand, category, title, rating, stock, description, theme }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500">
        {brand || 'Generic'} • {category}
      </span>
      <h2 className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-850'}`}>{title}</h2>

      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-1">
          <span className="text-amber-400">★</span>
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-750'}`}>
            {rating}
          </span>
        </div>
        <span className="text-zinc-300 dark:text-zinc-500">|</span>
        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-550'}`}>
          Stock: {stock} left
        </span>
      </div>

      <p className={`text-sm mt-4 leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
        {description}
      </p>
    </div>
  );
}
