/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/client/SearchResults.tsx
import React, { useState, useEffect, useMemo } from 'react';
import SearchHeader from '../../components/search/SearchHeader';
import SearchFilters from '../../components/search/SearchFilters';
import SearchControls from '../../components/search/SearchControls';
import HotelCard from '../../components/search/HotelCard';
import SearchMap from '../../components/search/SearchMap';
import { useToast } from '../../context/toast-context';
import { 
  searchResults, 
  defaultFilters, 
  mockSearchParams,
  type SearchFilters as SearchFiltersType} from '../../mocks/searchData';

const SearchResults: React.FC = () => {
  // State management
  const [filters, setFilters] = useState<SearchFiltersType>(defaultFilters);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(mockSearchParams);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const { success } = useToast();

  // Filter and sort logic
  const filteredAndSortedHotels = useMemo(() => {
    const filtered = searchResults.filter((hotel) => {
      // Price range filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }

      // Star rating filter
      if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) {
        return false;
      }

      // Guest rating filter
      if (filters.guestRating > 0 && hotel.guestRating < filters.guestRating) {
        return false;
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(hotel.propertyType)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Cancellation policy filter
      if (filters.cancellationPolicy.length > 0 && 
          !filters.cancellationPolicy.includes(hotel.cancellationPolicy)) {
        return false;
      }

      // Breakfast filter
      if (filters.mealPlans.includes('breakfast') && !hotel.breakfastIncluded) {
        return false;
      }

      return true;
    });

    // Sort logic
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.guestRating - a.guestRating);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        // Mock newest sorting
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
      default:
        // Relevance (default order)
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Event handlers
  const handleSearch = (newSearchParams: any) => {
    setIsLoading(true);
    setSearchParams(newSearchParams);
    
    // Simulate search API call
    setTimeout(() => {
      setIsLoading(false);
      success('Search updated', `Found ${filteredAndSortedHotels.length} properties`);
    }, 1000);
  };

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    success('Filters applied', `Showing ${filteredAndSortedHotels.length} properties`);
  };

  const handleHotelClick = (hotelId: string) => {
    window.location.href = `/hotel/${hotelId}`;
  };

  const handleFavoriteClick = (hotelId: string, isFavorited: boolean) => {
    const hotel = searchResults.find(h => h.id === hotelId);
    if (hotel) {
      if (isFavorited) {
        success('Added to favorites', `${hotel.name} saved to your favorites`);
      } else {
        success('Removed from favorites', `${hotel.name} removed from favorites`);
      }
    }
  };

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotel(hotelId);
    // Scroll to hotel card if not in fullscreen map
    if (!isMapFullscreen) {
      const element = document.getElementById(`hotel-${hotelId}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMapToggle = () => {
    setShowMap(!showMap);
    if (!showMap) {
      success('Map view enabled', 'View hotels on the map');
    }
  };

  const handleMapFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen);
  };

  const handleMapClose = () => {
    setIsMapFullscreen(false);
    setShowMap(false);
  };

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilters(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <SearchHeader
        initialSearch={searchParams}
        onSearch={handleSearch}
        onFilterToggle={() => setShowFilters(!showFilters)}
        resultsCount={filteredAndSortedHotels.length}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          
          {/* Filters Sidebar */}
          {/* <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <SearchFilters
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                resultsCount={filteredAndSortedHotels.length}
              />
            </div>
          </div> */}

          {/* Mobile Filters */}
          <SearchFilters
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            resultsCount={filteredAndSortedHotels.length}
          />

          {/* Results Content */}
          <div className="flex-1 min-w-0">
            
            {/* Controls */}
            <SearchControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewChange={setViewMode}
              showMap={showMap}
              onMapToggle={handleMapToggle}
              resultsCount={filteredAndSortedHotels.length}
              isLoading={isLoading}
            />

            {/* Content Area */}
            <div className={`flex gap-6 ${showMap ? '' : ''}`}>
              
              {/* Hotels List */}
              <div className={`transition-all duration-300 ${
                showMap ? 'w-1/2' : 'w-full'
              }`}>
                {isLoading ? (
                  // Loading State
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                        <div className="flex gap-4">
                          <div className="w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                          <div className="flex-1 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="flex justify-between items-center mt-4">
                              <div className="h-8 bg-gray-200 rounded w-24"></div>
                              <div className="h-10 bg-gray-200 rounded w-32"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredAndSortedHotels.length === 0 ? (
                  // No Results State
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No hotels found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters or search criteria to find more options.
                    </p>
                    <button
                      onClick={() => handleFiltersChange(defaultFilters)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  // Hotels List
                  <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-4 space-y-0' : ''}`}>
                    {filteredAndSortedHotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        id={`hotel-${hotel.id}`}
                        className={`transition-all duration-200 ${
                          selectedHotel === hotel.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                        }`}
                      >
                        <HotelCard
                          hotel={hotel}
                          viewMode={viewMode}
                          onHotelClick={handleHotelClick}
                          onFavoriteClick={handleFavoriteClick}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {!isLoading && filteredAndSortedHotels.length > 0 && (
                  <div className="text-center mt-8">
                    <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg border border-gray-300 font-medium transition-colors">
                      Load More Hotels
                    </button>
                  </div>
                )}
              </div>

              {/* Map */}
              {showMap && !isMapFullscreen && (
                <div className="w-1/2 sticky top-6 h-[calc(100vh-8rem)]">
                  <SearchMap
                    hotels={filteredAndSortedHotels}
                    selectedHotel={selectedHotel ?? undefined}
                    onHotelSelect={handleHotelSelect}
                    onFullscreenToggle={handleMapFullscreen}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map */}
      {isMapFullscreen && (
        <SearchMap
          hotels={filteredAndSortedHotels}
          selectedHotel={selectedHotel ?? undefined}
          onHotelSelect={handleHotelSelect}
          isFullscreen={true}
          onFullscreenToggle={handleMapFullscreen}
          onClose={handleMapClose}
        />
      )}
    </div>
  );
};

export default SearchResults;