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
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState<string[]>(['All']);

  // Detect standalone mode
  const isStandalone = typeof window !== 'undefined' && !(window as any).__MFE_HOST__;
  const activeSearch = isStandalone ? localSearch : searchQuery;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch full category list for standalone filters once on mount
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category-list');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(['All', ...data.sort()]);
        }
      } catch (err) {
        console.error('Failed to fetch categories list:', err);
      }
    };
    if (isStandalone) {
      fetchCategoryList();
    }
  }, [isStandalone]);

  // Fetch products from server-side pagination API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const limit = itemsPerPage;
        const skip = (currentPage - 1) * limit;

        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        if (activeSearch) {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(activeSearch)}&limit=${limit}&skip=${skip}`;
        } else if (activeCategory && activeCategory !== 'All') {
          url = `https://dummyjson.com/products/category/${encodeURIComponent(activeCategory)}?limit=${limit}&skip=${skip}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.products || []);
        setTotalProducts(data.total || 0);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, activeCategory, activeSearch]);

  // Reset page number on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSearch]);

  // Scroll main container to top when page changes
  useEffect(() => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (navigate) {
      navigate(`/product/${product.id}`);
    }
  };

  // Pagination bounds
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const paginatedProducts = products;

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
          totalItems={totalProducts}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
