import React from 'react';
import { Button } from '@mfe/shared-ui';

interface ReviewFormProps {
  text: string;
  onChangeText: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoggedIn: boolean;
  theme: string;
}

export default function ReviewForm({ text, onChangeText, onSubmit, isLoggedIn, theme }: ReviewFormProps) {
  if (!isLoggedIn) {
    return (
      <div
        className={`p-4 rounded-lg text-center text-xs border border-dashed ${
          theme === 'dark'
            ? 'bg-zinc-850/60 text-zinc-400 border-zinc-805 border-zinc-800'
            : 'bg-zinc-50 text-zinc-500 border-zinc-200'
        }`}
      >
        Please log in to leave a review.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder="Write a product review..."
        rows={3}
        className={`w-full p-3 rounded-lg border focus:outline-none focus:border-indigo-500 transition text-sm resize-none ${
          theme === 'dark'
            ? 'bg-zinc-850 text-zinc-150 placeholder-zinc-500 border-zinc-700'
            : 'bg-zinc-50 text-zinc-850 placeholder-zinc-400 border-zinc-250'
        }`}
      />
      <div className="flex justify-end">
        <Button variant="primary" type="submit" disabled={!text.trim()}>
          Submit Review
        </Button>
      </div>
    </form>
  );
}
