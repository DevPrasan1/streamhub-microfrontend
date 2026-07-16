import React from 'react';
import { ProductCard, Spinner } from '@mfe/shared-ui';
import { Product } from '@mfe/shared-types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ products, loading, onProductClick }: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Spinner />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-xl">
        No products match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
}
