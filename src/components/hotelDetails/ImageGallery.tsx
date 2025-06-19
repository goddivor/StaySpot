// src/components/hotelDetails/ImageGallery.tsx
import React, { useState } from 'react';
import { Eye, ArrowLeft, ArrowRight } from 'iconsax-react';
import { X } from '@phosphor-icons/react';
import Button from '../Button';

interface ImageGalleryProps {
  images: string[];
  hotelName: string;
  onImageClick?: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  hotelName, 
  onImageClick 
}) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setShowLightbox(true);
    onImageClick?.(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setShowLightbox(false);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 h-96 rounded-xl overflow-hidden">
        {/* Main large image */}
        <div 
          className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={images[0]}
            alt={`${hotelName} - Main view`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-white">
              <Eye color="white" size={20} />
              <span className="text-sm font-medium">View Gallery</span>
            </div>
          </div>
        </div>

        {/* Side images */}
        {images.slice(1, 5).map((image, index) => (
          <div 
            key={index + 1}
            className="relative group cursor-pointer overflow-hidden"
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              src={image}
              alt={`${hotelName} - View ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            
            {/* Show more overlay on last image */}
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Eye color="white" size={24} className="mx-auto mb-2" />
                  <span className="text-lg font-bold">+{images.length - 5}</span>
                  <div className="text-sm">more photos</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Photos Button */}
      <div className="mt-4 text-center">
        <Button
          onClick={() => handleImageClick(0)}
          className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg border border-gray-300 transition-colors flex items-center gap-2 mx-auto"
        >
          <Eye color="#374151" size={18} />
          View All {images.length} Photos
        </Button>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <Button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
          >
            <X color="white" size={24} />
          </Button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-10 bg-opacity-50 text-white px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          <Button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
          >
            <ArrowLeft color="white" size={24} />
          </Button>

          {/* Next button */}
          <Button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors"
          >
            <ArrowRight color="white" size={24} />
          </Button>

          {/* Main image */}
          <img
            src={images[currentIndex]}
            alt={`${hotelName} - View ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="flex gap-2 bg-opacity-50 p-2 rounded-lg max-w-screen-lg overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    index === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;