import React from 'react';
import { useProductStore, useCartStore, useUIStore } from '@mfe/shared-store';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import CartActions from './components/CartActions';

export default function App() {
  const { selectedProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const { theme } = useUIStore();

  if (!selectedProduct) {
    return (
      <div className="aspect-video bg-white dark:bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-500">
        No product selected
      </div>
    );
  }

  return (
    <div className="details-container">
      <div
        className={`details-card gap-6 p-6 rounded-xl border shadow-sm dark:shadow-2xl transition duration-200 ${
          theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-250 text-zinc-800'
        }`}
      >
        <ImageGallery
          images={selectedProduct.images}
          title={selectedProduct.title}
          thumbnail={selectedProduct.thumbnail}
          discountPercentage={selectedProduct.discountPercentage}
        />

        <div className="flex-1 flex flex-col justify-between">
          <ProductInfo
            brand={selectedProduct.brand}
            category={selectedProduct.category}
            title={selectedProduct.title}
            rating={selectedProduct.rating}
            stock={selectedProduct.stock}
            description={selectedProduct.description}
            theme={theme}
          />

          <CartActions
            price={selectedProduct.price}
            discountPercentage={selectedProduct.discountPercentage}
            onAddToCart={() => addToCart(selectedProduct)}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
