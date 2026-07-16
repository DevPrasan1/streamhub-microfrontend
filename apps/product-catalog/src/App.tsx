import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore, useUIStore } from '@mfe/shared-store';
import { Product } from '@mfe/shared-types';
import StandaloneFilters from './components/StandaloneFilters';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

export default function App() {
  const navigate = useNavigate();
  const params = useParams<{ categoryName?: string }>();

  const { setSelectedProduct, activeCategory: storeCategory, setActiveCategory } = useProductStore();
  const activeCategory = params.categoryName || storeCategory || 'All';
  const { searchQuery } = useUIStore();
  const [localSearch, setLocalSearch] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Detect standalone mode
  const isStandalone = typeof window !== 'undefined' && !(window as any).__MFE_HOST__;
  const activeSearch = isStandalone ? localSearch : searchQuery;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter Categories dynamically
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category))).sort()];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = activeSearch
      ? (product.title || '').toLowerCase().includes(activeSearch.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(activeSearch.toLowerCase()) ||
        (product.brand || '').toLowerCase().includes(activeSearch.toLowerCase())
      : true;

    const matchesCategory = activeCategory === 'All' ? true : product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Reset page number on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSearch]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (navigate) {
      navigate(`/product/${product.id}`);
    }
  };

  // Pagination bounds
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Bar (Only show in standalone mode) */}
      {isStandalone && (
        <StandaloneFilters
          categories={categories}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          onChangeSearch={setLocalSearch}
        />
      )}

      {/* Products Grid */}
      <ProductGrid products={paginatedProducts} loading={loading} onProductClick={handleProductClick} />

      {/* Pagination Bar */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
