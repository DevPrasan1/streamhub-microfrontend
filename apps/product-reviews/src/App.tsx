import React, { useState, useEffect } from 'react';
import { useAuthStore, useProductStore, useUIStore } from '@mfe/shared-store';
import { Comment } from '@mfe/shared-types';
import ReviewHeader from './components/ReviewHeader';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

export default function App() {
  const { user } = useAuthStore();
  const { selectedProduct } = useProductStore();
  const { theme } = useUIStore();
  const [reviews, setReviews] = useState<Comment[]>([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const productId = selectedProduct?.id || 0;

  useEffect(() => {
    if (selectedProduct && selectedProduct.reviews) {
      const list: Comment[] = selectedProduct.reviews.map((r: any, index: number) => ({
        id: `store-review-${selectedProduct.id}-${index}`,
        productId: selectedProduct.id,
        uid: `reviewer-${r.reviewerEmail}`,
        userName: r.reviewerName,
        message: `★ ${r.rating}/5 - ${r.comment}`,
        createdAt: r.date,
      }));
      setReviews(list);
    } else {
      setReviews([]);
    }
  }, [selectedProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim() || !user || productId === 0) return;

    const newReview = {
      rating: 5, // Default rating for new user review
      comment: newReviewText.trim(),
      date: new Date().toISOString(),
      reviewerName: user.displayName || user.email.split('@')[0],
      reviewerEmail: user.email,
    };

    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        reviews: [...(selectedProduct.reviews || []), newReview],
      };
      useProductStore.setState({ selectedProduct: updatedProduct });
    }
    setNewReviewText('');
  };

  const handleDelete = async (reviewId: string) => {
    if (!selectedProduct || !selectedProduct.reviews) return;

    const match = reviewId.match(/store-review-\d+-(\d+)/);
    if (match) {
      const indexToDelete = parseInt(match[1], 10);
      const updatedReviews = selectedProduct.reviews.filter((_, idx) => idx !== indexToDelete);

      const updatedProduct = {
        ...selectedProduct,
        reviews: updatedReviews,
      };
      useProductStore.setState({ selectedProduct: updatedProduct });
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
  });

  if (productId === 0) {
    return (
      <div
        className={`p-6 rounded-xl border text-center text-zinc-500 ${
          theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
        }`}
      >
        Select a product to view reviews.
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-6 p-6 rounded-xl border transition duration-200 ${
        theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'
      }`}
    >
      <ReviewHeader count={reviews.length} sortBy={sortBy} onChangeSort={setSortBy} theme={theme} />

      <ReviewForm
        text={newReviewText}
        onChangeText={setNewReviewText}
        onSubmit={handleSubmit}
        isLoggedIn={!!user}
        theme={theme}
      />

      <ReviewList reviews={sortedReviews} currentUserId={user?.uid} onDelete={handleDelete} theme={theme} />
    </div>
  );
}
