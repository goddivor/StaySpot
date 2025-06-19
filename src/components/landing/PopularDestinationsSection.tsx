// src/components/landing/PopularDestinationsSection.tsx
import React from 'react';
import { Heart, ArrowRight } from 'iconsax-react';
import Button from '../Button';
import { popularDestinations } from '../../mocks/landingData';

const PopularDestinationsSection: React.FC = () => {
  const handleDestinationClick = (destinationName: string) => {
    console.log(`Navigate to ${destinationName}`);
    // Here you would typically navigate to search results for this destination
    window.location.href = `/search?destination=${encodeURIComponent(destinationName)}`;
  };

  const handleViewAllDestinations = () => {
    window.location.href = '/search';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the world's most beloved travel destinations, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => handleDestinationClick(destination.name)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Heart
                    color="#FFFFFF"
                    size={24}
                    className="text-white hover:text-red-500 transition-colors cursor-pointer"
                    variant="Outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Add ${destination.name} to favorites`);
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{destination.name}</h3>
                  <p className="text-white text-sm opacity-90">{destination.country}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${destination.startingPrice}
                  </span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {destination.hotelCount} hotels available
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {destination.popularAttractions}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            onClick={handleViewAllDestinations}
          >
            View All Destinations
            <ArrowRight color="white" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;