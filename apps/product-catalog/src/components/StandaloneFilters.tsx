import React from 'react';
import { Tabs, Search } from '@mfe/shared-ui';

interface StandaloneFiltersProps {
  categories: string[];
  activeCategory: string;
  onChangeCategory: (category: string) => void;
  onChangeSearch: (search: string) => void;
}

export default function StandaloneFilters({
  categories,
  activeCategory,
  onChangeCategory,
  onChangeSearch,
}: StandaloneFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar scroll-smooth">
        <Tabs
          tabs={categories.map((c) => ({ id: c, label: c.toUpperCase() }))}
          activeTab={activeCategory}
          onChange={onChangeCategory}
          className="flex-nowrap border-b-0 whitespace-nowrap overflow-x-auto"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 shrink-0">
        <div className="w-full sm:w-64">
          <Search placeholder="Search products..." onChange={(e) => onChangeSearch(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
