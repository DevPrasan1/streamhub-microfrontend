import React from 'react';
import { ReviewCard } from '@mfe/shared-ui';
import { Comment } from '@mfe/shared-types';

interface ReviewListProps {
  reviews: Comment[];
  currentUserId?: string;
  onDelete: (id: string) => void;
  theme: string;
}

export default function ReviewList({ reviews, currentUserId, onDelete, theme }: ReviewListProps) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] no-scrollbar">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onDelete={onDelete} currentUserId={currentUserId} />
        ))
      ) : (
        <div
          className={`text-center py-6 text-xs border border-dashed rounded-lg ${
            theme === 'dark' ? 'text-zinc-500 border-zinc-800' : 'text-zinc-450 border-zinc-200'
          }`}
        >
          No reviews yet. Be the first to review this product!
        </div>
      )}
    </div>
  );
}
