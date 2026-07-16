import React, { Suspense } from 'react';
import { Spinner } from '@mfe/shared-ui';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Lazy load Catalog Remote MFE App
const ProductCatalogApp = React.lazy(() => import('product_catalog/ProductCatalogApp'));

export default function DiscoverProductsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Discover Products</h2>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex justify-center p-12">
              <Spinner />
            </div>
          }
        >
          <ProductCatalogApp />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
