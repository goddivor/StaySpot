// src/components/hotelDetails/ReviewsSection.tsx
import React, { useState } from 'react';
import { Like1, Filter, Sort } from 'iconsax-react';
import { getStarRating } from '../../utils/iconService';
import Button from '../Button';
import type { DetailedHotel, HotelReview } from '../../mocks/hotelDetailsData';

interface ReviewsSectionProps {
  hotel: DetailedHotel;
  reviews: HotelReview[];
  reviewsBreakdown: {
    excellent: number;
    veryGood: number;
    good: number;
    fair: number;
    poor: number;
  };
  categoryRatings: {
    cleanliness: number;
    comfort: number;
    location: number;
    service: number;
    valueForMoney: number;
    facilities: number;
  };
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  hotel,
  reviews,
  reviewsBreakdown,
  categoryRatings
}) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return 'Exceptional';
    if (rating >= 8) return 'Excellent';
    if (rating >= 7) return 'Very Good';
    if (rating >= 6) return 'Good';
    return 'Fair';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'bg-green-600';
    if (rating >= 8) return 'bg-blue-600';
    if (rating >= 7) return 'bg-indigo-600';
    if (rating >= 6) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  const getTravelTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      business: 'Business',
      leisure: 'Leisure',
      family: 'Family',
      couple: 'Couple',
      solo: 'Solo'
    };
    return labels[type] || type;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getTravelTypeIcon = (travelType: string) => {
    return '👤'; // Default icon, could be expanded with specific icons
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const sorted = [...filteredReviews];
    
    switch (newSort) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        sorted.sort((a, b) => b.helpful - a.helpful);
        break;
    }
    
    setFilteredReviews(sorted);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilterBy(newFilter);
    let filtered = reviews;
    
    if (newFilter !== 'all') {
      filtered = reviews.filter(review => review.travelType === newFilter);
    }
    
    setFilteredReviews(filtered);
  };

  const getBreakdownPercentage = (count: number) => {
    return Math.round((count / hotel.reviewCount) * 100);
  };

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
      
      {/* Overall Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Overall Score */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <div className={`${getRatingColor(hotel.guestRating)} text-white text-3xl font-bold px-4 py-3 rounded-lg`}>
              {hotel.guestRating}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{getRatingLabel(hotel.guestRating)}</div>
              <div className="text-gray-600">{hotel.reviewCount} reviews</div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            {getStarRating(Math.round(hotel.guestRating / 2))}
          </div>
        </div>

        {/* Category Ratings */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Rating Breakdown</h3>
          <div className="space-y-2">
            {Object.entries(categoryRatings).map(([category, rating]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(rating / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Distribution */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Review Distribution</h3>
          <div className="space-y-2">
            {[
              { label: 'Excellent', count: reviewsBreakdown.excellent, stars: 5 },
              { label: 'Very Good', count: reviewsBreakdown.veryGood, stars: 4 },
              { label: 'Good', count: reviewsBreakdown.good, stars: 3 },
              { label: 'Fair', count: reviewsBreakdown.fair, stars: 2 },
              { label: 'Poor', count: reviewsBreakdown.poor, stars: 1 }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex">
                  {getStarRating(item.stars)}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${getBreakdownPercentage(item.count)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {getBreakdownPercentage(item.count)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter color="#6B7280" size={18} />
          <select
            value={filterBy}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Reviews</option>
            <option value="business">Business</option>
            <option value="leisure">Leisure</option>
            <option value="family">Family</option>
            <option value="couple">Couple</option>
            <option value="solo">Solo</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Sort color="#6B7280" size={18} />
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              
              {/* Guest Avatar */}
              <img
                src={review.guestImage}
                alt={review.guestName}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.guestName}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{review.guestCountry}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {getTravelTypeIcon(review.travelType)}
                        {getTravelTypeLabel(review.travelType)}
                      </span>
                      {review.verified && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 font-medium">Verified Stay</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`${getRatingColor(review.rating)} text-white px-2 py-1 rounded font-bold text-sm`}>
                      {review.rating}
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                </div>

                {/* Stay Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span>Room: {review.roomType}</span>
                  <span>Stay: {review.stayDuration}</span>
                </div>

                {/* Liked/Disliked */}
                {(review.liked.length > 0 || review.disliked) && (
                  <div className="mb-4">
                    {review.liked.length > 0 && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-green-700">Liked: </span>
                        <span className="text-sm text-gray-700">{review.liked.join(', ')}</span>
                      </div>
                    )}
                    {review.disliked && review.disliked.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-red-700">Disliked: </span>
                        <span className="text-sm text-gray-700">{review.disliked.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Category Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {Object.entries(review.categoryRatings).map(([category, rating]) => (
                    <div key={category} className="flex justify-between text-xs">
                      <span className="text-gray-600 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium">{rating}</span>
                    </div>
                  ))}
                </div>

                {/* Helpful Button */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Like1 color="currentColor" size={16} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredReviews.length > 3 && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg border border-blue-600 font-medium transition-colors"
          >
            {showAllReviews 
              ? 'Show Less Reviews' 
              : `Show All ${filteredReviews.length} Reviews`
            }
          </Button>
        </div>
      )}

      {/* Write Review CTA */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Share Your Experience</h3>
        <p className="text-gray-600 mb-4">Help other travelers by writing a review about your stay.</p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Write a Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;