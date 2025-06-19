// src/components/search/SearchControls.tsx
import React from 'react';
import { Element3, RowVertical, Location, Sort } from 'iconsax-react';
import Button from '../Button';
import { sortOptions } from '../../mocks/searchData';

interface SearchControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
  showMap: boolean;
  onMapToggle: () => void;
  resultsCount: number;
  isLoading?: boolean;
}

const SearchControls: React.FC<SearchControlsProps> = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewChange,
  showMap,
  onMapToggle,
  resultsCount,
  isLoading = false
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Results info */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </div>
            ) : (
              `${resultsCount} properties found`
            )}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Sort color="#6B7280" size={18} />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              onClick={() => onViewChange('list')}
              className={`px-3 py-2 text-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <RowVertical 
                color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} 
                size={16} 
              />
            </Button>
            <Button
              onClick={() => onViewChange('grid')}
              className={`px-3 py-2 text-sm transition-colors border-l border-gray-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Element3 
                color={viewMode === 'grid' ? '#FFFFFF' : '#6B7280'} 
                size={16} 
              />
            </Button>
          </div>

          {/* Map Toggle */}
          <Button
            onClick={onMapToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              showMap
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <Location 
              color={showMap ? '#FFFFFF' : '#6B7280'} 
              size={16} 
            />
            {showMap ? 'Hide Map' : 'Show Map'}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-3 flex flex-wrap gap-2">
        {/* This would show active filters as badges */}
        {/* Example implementation would go here */}
      </div>
    </div>
  );
};

export default SearchControls;