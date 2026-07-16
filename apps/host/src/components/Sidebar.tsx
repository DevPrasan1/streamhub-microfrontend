import React, { Suspense } from 'react';
import { useUIStore } from '@mfe/shared-store';
import { ErrorBoundary } from './ErrorBoundary';

const CategorySelectorApp = React.lazy(() => import('product_catalog/CategorySelector'));

export default function Sidebar() {
  const { sidebarOpen, theme } = useUIStore();

  return (
    <aside
      className={`${
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      } shrink-0 border-r transition-all duration-300 flex flex-col ${
        theme === 'dark' ? 'border-zinc-800 bg-zinc-950/40 text-zinc-300' : 'border-zinc-200 bg-white text-zinc-700'
      }`}
    >
      <div className={`p-4 flex-1 flex flex-col min-h-0 ${theme === 'dark' ? 'bg-zinc-950/40' : 'bg-white'}`}>
        <ErrorBoundary>
          <Suspense fallback={<div className="text-xs text-zinc-500 px-4">Loading categories...</div>}>
            <CategorySelectorApp />
          </Suspense>
        </ErrorBoundary>
      </div>
    </aside>
  );
}
