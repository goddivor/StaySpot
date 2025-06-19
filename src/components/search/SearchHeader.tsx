/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/search/SearchHeader.tsx
import React, { useState } from 'react';
import { Calendar, Location, Profile2User, SearchNormal1, Setting4 } from 'iconsax-react';
import Button from '../Button';
import { Logo } from '../ui/logo';

interface SearchHeaderProps {
  initialSearch?: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
  };
  onSearch?: (searchData: any) => void;
  onFilterToggle?: () => void;
  resultsCount?: number;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  initialSearch = {
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1
  },
  onSearch,
  onFilterToggle,
  resultsCount = 0
}) => {
  const [searchData, setSearchData] = useState(initialSearch);
  const [isSticky, setIsSticky] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (field: keyof typeof searchData, value: string | number) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchData);
  };

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span 
                className="text-xl font-bold text-gray-900 cursor-pointer" 
                onClick={() => window.location.href = '/'}
              >
                StaySpot
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                className="text-gray-700 hover:text-blue-600 bg-transparent hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-300"
                onClick={() => window.location.href = '/login'}
              >
                Sign In
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                onClick={() => window.location.href = '/register'}
              >
                Sign Up
              </Button>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Destination */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <Location
                    color="#6B7280"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={searchData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar
                    color="#6B7280"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar
                    color="#6B7280"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Guests & Rooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <div className="relative">
                  <Profile2User
                    color="#6B7280"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <select
                    value={`${searchData.guests}-${searchData.rooms}`}
                    onChange={(e) => {
                      const [guests, rooms] = e.target.value.split('-').map(Number);
                      handleInputChange('guests', guests);
                      handleInputChange('rooms', rooms);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="1-1">1 Guest, 1 Room</option>
                    <option value="2-1">2 Guests, 1 Room</option>
                    <option value="3-1">3 Guests, 1 Room</option>
                    <option value="4-1">4 Guests, 1 Room</option>
                    <option value="4-2">4 Guests, 2 Rooms</option>
                    <option value="6-2">6 Guests, 2 Rooms</option>
                    <option value="8-3">8 Guests, 3 Rooms</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button
                type="button"
                onClick={onFilterToggle}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-all duration-300"
              >
                <Setting4 color="#6B7280" size={18} />
                Filters
              </Button>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <SearchNormal1 color="white" size={18} />
                Search
              </Button>
            </div>
          </form>

          {/* Results Count */}
          {resultsCount > 0 && (
            <div className="mt-4 text-gray-600">
              <p>Found <span className="font-semibold text-gray-900">{resultsCount}</span> properties in <span className="font-semibold text-gray-900">{searchData.destination}</span></p>
            </div>
          )}
        </div>
      </header>

      {/* Sticky Header (shows when scrolling) */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Logo size={32} />
                <div className="text-sm">
                  <span className="font-medium">{searchData.destination}</span>
                  <span className="text-gray-500 ml-2">
                    {searchData.checkIn} - {searchData.checkOut}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={onFilterToggle}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                >
                  Filters
                </Button>
                <Button
                  onClick={handleSearchSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Modify Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchHeader;