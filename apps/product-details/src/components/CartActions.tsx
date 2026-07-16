import React from 'react';
import { Button } from '@mfe/shared-ui';

interface CartActionsProps {
  price: number;
  discountPercentage?: number;
  onAddToCart: () => void;
  theme: string;
}

export default function CartActions({ price, discountPercentage, onAddToCart, theme }: CartActionsProps) {
  return (
    <div
      className={`flex flex-col gap-4 mt-6 pt-6 border-t ${
        theme === 'dark' ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-indigo-650 dark:text-indigo-400">${price}</span>
        {discountPercentage && (
          <span className="text-sm text-zinc-450 dark:text-zinc-500 line-through">
            ${Math.round(price / (1 - discountPercentage / 100))}
          </span>
        )}
      </div>

      <Button
        variant="primary"
        onClick={onAddToCart}
        className="w-full flex items-center justify-center gap-2 py-3 shadow-lg"
      >
        <span>🛒</span> Add to Shopping Cart
      </Button>
    </div>
  );
}
