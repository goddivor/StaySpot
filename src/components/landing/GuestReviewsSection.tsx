// src/components/landing/GuestReviewsSection.tsx
import React from 'react';
import { getStarRating } from '../../utils/iconService';
import { guestReviews } from '../../mocks/landingData';

const GuestReviewsSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from real travelers who've made unforgettable memories with StaySpot.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {guestReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-96 flex-shrink-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.guestImage}
                    alt={review.guestName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{review.guestName}</h4>
                    <p className="text-sm text-gray-600">{review.guestLocation}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex">
                      {getStarRating(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{review.reviewText}"</p>
                <div className="text-sm text-blue-600 font-medium">
                  Stayed at {review.hotelName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestReviewsSection;