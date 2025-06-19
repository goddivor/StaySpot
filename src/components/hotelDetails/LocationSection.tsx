/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/hotelDetails/LocationSection.tsx
import React, { useState } from 'react';
import { 
  Location, 
  Routing, 
  Star1, 
  Car, 
  Bus,
  Map1,
  DirectRight,
  InfoCircle
} from 'iconsax-react';
import Button from '../Button';
import type { DetailedHotel, NearbyAttraction } from '../../mocks/hotelDetailsData';
import { PersonSimpleWalk } from '@phosphor-icons/react';

interface LocationSectionProps {
  hotel: DetailedHotel;
  nearbyAttractions: NearbyAttraction[];
}

const LocationSection: React.FC<LocationSectionProps> = ({
  hotel,
  nearbyAttractions
}) => {
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const [transportMode, setTransportMode] = useState<'walking' | 'driving' | 'transit'>('walking');

  const getAttractionIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      museum: '🏛️',
      restaurant: '🍽️',
      landmark: '🏛️',
      shopping: '🛍️',
      transport: '🚇',
      entertainment: '🎭'
    };
    return icons[type] || '📍';
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'walking':
        return <PersonSimpleWalk color="#374151" size={16} />;
      case 'driving':
        return <Car color="#374151" size={16} />;
      case 'transit':
        return <Bus color="#374151" size={16} />;
      default:
        return <PersonSimpleWalk color="#374151" size={16} />;
    }
  };

  const getTransportTime = (attraction: NearbyAttraction, mode: string) => {
    const distance = attraction.distance;
    switch (mode) {
      case 'walking':
        return attraction.walkingTime ? `${attraction.walkingTime} min` : `${Math.round(distance * 12)} min`;
      case 'driving':
        return `${Math.round(distance * 3)} min`;
      case 'transit':
        return `${Math.round(distance * 5)} min`;
      default:
        return attraction.walkingTime ? `${attraction.walkingTime} min` : `${Math.round(distance * 12)} min`;
    }
  };

  const sortedAttractions = [...nearbyAttractions].sort((a, b) => a.distance - b.distance);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Nearby</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Map Section */}
        <div>
          <div className="bg-gray-100 rounded-xl h-96 relative overflow-hidden">
            {/* Mock Map */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
              
              {/* Street Pattern Overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="streets-detail"
                      x="0"
                      y="0"
                      width="80"
                      height="80"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M 0 40 L 80 40" stroke="#374151" strokeWidth="1" />
                      <path d="M 40 0 L 40 80" stroke="#374151" strokeWidth="1" />
                      <path d="M 0 20 L 80 20" stroke="#6B7280" strokeWidth="0.5" />
                      <path d="M 0 60 L 80 60" stroke="#6B7280" strokeWidth="0.5" />
                      <path d="M 20 0 L 20 80" stroke="#6B7280" strokeWidth="0.5" />
                      <path d="M 60 0 L 60 80" stroke="#6B7280" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#streets-detail)" />
                </svg>
              </div>

              {/* Hotel Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 relative">
                  <Location color="white" size={16} />
                  <span className="font-medium text-sm">{hotel.name}</span>
                  {/* Marker point */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500" />
                </div>
              </div>

              {/* Nearby Attractions Markers */}
              {sortedAttractions.slice(0, 6).map((attraction, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 80 + (attraction.distance * 20);
                const x = 50 + (radius * Math.cos(angle)) / 3;
                const y = 50 + (radius * Math.sin(angle)) / 3;

                return (
                  <div
                    key={attraction.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      selectedAttraction === attraction.id ? 'scale-110 z-10' : 'hover:scale-105'
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => setSelectedAttraction(
                      selectedAttraction === attraction.id ? null : attraction.id
                    )}
                  >
                    <div className="bg-blue-500 text-white px-2 py-1 rounded shadow-lg text-xs font-medium">
                      <span className="mr-1">{getAttractionIcon(attraction.type)}</span>
                      {attraction.distance}km
                    </div>
                    
                    {/* Info popup */}
                    {selectedAttraction === attraction.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl border p-3 z-20">
                        <h4 className="font-medium text-gray-900 text-sm">{attraction.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{attraction.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span>{attraction.distance}km</span>
                          {attraction.walkingTime && (
                            <>
                              <span>•</span>
                              <span>{attraction.walkingTime} min walk</span>
                            </>
                          )}
                          {attraction.rating && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Star1 color="#F59E0B" size={10} variant="Bold" />
                                <span>{attraction.rating}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded shadow-lg border">
                  +
                </Button>
                <Button className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded shadow-lg border">
                  −
                </Button>
              </div>

              {/* Transport Mode Toggle */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border p-2">
                <div className="flex gap-1">
                  {[
                    { mode: 'walking', icon: <PersonSimpleWalk color={transportMode === 'walking' ? '#3B82F6' : '#6B7280'} size={16} /> },
                    { mode: 'driving', icon: <Car color={transportMode === 'driving' ? '#3B82F6' : '#6B7280'} size={16} /> },
                    { mode: 'transit', icon: <Bus color={transportMode === 'transit' ? '#3B82F6' : '#6B7280'} size={16} /> }
                  ].map(({ mode, icon }) => (
                    <button
                      key={mode}
                      onClick={() => setTransportMode(mode as any)}
                      className={`p-2 rounded transition-colors ${
                        transportMode === mode ? 'bg-blue-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Address and Directions */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Location color="#374151" size={20} className="mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                <p className="text-gray-700 mb-3">{hotel.address}</p>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Routing color="white" size={16} />
                    Get Directions
                  </Button>
                  <Button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors flex items-center gap-2">
                    <Map1 color="#374151" size={16} />
                    View in Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Attractions List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Nearby Attractions</h3>
            <div className="text-sm text-gray-600">Distance from hotel</div>
          </div>

          {/* Transport Mode Selector */}
          <div className="flex gap-2 mb-4">
            {[
              { mode: 'walking', label: 'Walking', icon: <PersonSimpleWalk color="currentColor" size={16} /> },
              { mode: 'driving', label: 'Driving', icon: <Car color="currentColor" size={16} /> },
              { mode: 'transit', label: 'Transit', icon: <Bus color="currentColor" size={16} /> }
            ].map(({ mode, label, icon }) => (
              <button
                key={mode}
                onClick={() => setTransportMode(mode as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  transportMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Attractions List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sortedAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className={`bg-white border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                  selectedAttraction === attraction.id
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedAttraction(
                  selectedAttraction === attraction.id ? null : attraction.id
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">
                    {getAttractionIcon(attraction.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">{attraction.name}</h4>
                      {attraction.rating && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star1 color="#F59E0B" size={14} variant="Bold" />
                          <span className="text-sm font-medium text-gray-900">{attraction.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{attraction.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Location color="#6B7280" size={14} />
                        <span>{attraction.distance} km</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {getTransportIcon(transportMode)}
                        <span>{getTransportTime(attraction, transportMode)}</span>
                      </div>
                      
                      <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                        {attraction.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <DirectRight 
                      color="#6B7280" 
                      size={16}
                      className={`transform transition-transform ${
                        selectedAttraction === attraction.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedAttraction === attraction.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Distance:</span>
                        <span className="ml-2 text-gray-600">{attraction.distance} km</span>
                      </div>
                      {attraction.walkingTime && (
                        <div>
                          <span className="font-medium text-gray-900">Walking:</span>
                          <span className="ml-2 text-gray-600">{attraction.walkingTime} min</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-900">Type:</span>
                        <span className="ml-2 text-gray-600 capitalize">{attraction.type}</span>
                      </div>
                      {attraction.rating && (
                        <div>
                          <span className="font-medium text-gray-900">Rating:</span>
                          <span className="ml-2 text-gray-600">{attraction.rating}/5</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1">
                        <Routing color="white" size={14} />
                        Directions
                      </Button>
                      <Button className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-1 rounded border border-gray-300 text-sm font-medium transition-colors flex items-center gap-1">
                        <InfoCircle color="#374151" size={14} />
                        More Info
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Transportation Info */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Bus color="#374151" size={18} />
              Transportation
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Nearest Metro Station:</span>
                <span className="font-medium">Charles de Gaulle-Étoile (200m)</span>
              </div>
              <div className="flex justify-between">
                <span>Airport Distance:</span>
                <span className="font-medium">Charles de Gaulle (35 km)</span>
              </div>
              <div className="flex justify-between">
                <span>City Center:</span>
                <span className="font-medium">{hotel.distanceFromCenter} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;