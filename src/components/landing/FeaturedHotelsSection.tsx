// src/components/landing/FeaturedHotelsSection.tsx
import React from 'react';
import { Heart, ArrowRight, Location } from 'iconsax-react';
import Button from '../Button';
import { getAmenityIcon, getStarRating } from '../../utils/iconService';
import { featuredHotels } from '../../mocks/landingData';

const FeaturedHotelsSection: React.FC = () => {
  const handleHotelClick = (hotelId: string) => {
    window.location.href = `/hotel/${hotelId}`;
  };

  const handleViewAllHotels = () => {
    window.location.href = '/search';
  };

  const handleFavoriteClick = (e: React.MouseEvent, hotelName: string) => {
    e.stopPropagation();
    console.log(`Add ${hotelName} to favorites`);
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Hotels</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked exceptional properties that offer luxury, comfort, and unforgettable experiences.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {featuredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 w-80 flex-shrink-0"
                onClick={() => handleHotelClick(hotel.id)}
              >
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Heart
                      color="#FFFFFF"
                      size={24}
                      className="text-white hover:text-red-500 transition-colors cursor-pointer"
                      variant="Outline"
                      onClick={(e) => handleFavoriteClick(e, hotel.name)}
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                    {hotel.starRating} Star Hotel
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <Location color="#6B7280" size={16} />
                        {hotel.location} • {hotel.distanceFromCenter}km from center
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {getStarRating(hotel.starRating)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
                        {hotel.guestRating}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({hotel.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 text-gray-600">
                        {getAmenityIcon(amenity, { size: 16, color: '#6B7280' })}
                        <span className="text-xs capitalize">{amenity.replace('-', ' ')}</span>
                      </div>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-blue-600 font-medium">
                        +{hotel.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${hotel.startingPrice}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">per night</span>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHotelClick(hotel.id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            onClick={handleViewAllHotels}
          >
            View All Hotels
            <ArrowRight color="white" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotelsSection;