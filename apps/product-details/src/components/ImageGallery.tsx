import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
  thumbnail: string;
  discountPercentage?: number;
}

export default function ImageGallery({ images, title, thumbnail, discountPercentage }: ImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryImages = images && images.length > 0 ? images : [thumbnail];

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="relative aspect-square w-full max-w-md mx-auto bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-850 flex items-center justify-center">
        <img
          src={galleryImages[activeImageIndex] || thumbnail}
          alt={title}
          className="object-contain w-full h-full max-h-[300px]"
        />
        {discountPercentage && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar justify-center py-2">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-12 h-12 rounded-lg border-2 overflow-hidden bg-zinc-50 dark:bg-zinc-950 shrink-0 transition ${
                activeImageIndex === index
                  ? 'border-indigo-500'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <img src={img} alt="" className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
