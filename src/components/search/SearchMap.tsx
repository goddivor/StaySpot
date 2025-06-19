// src/components/search/SearchMap.tsx
import React, { useState, useRef, useEffect } from "react";
import { Location, Maximize4 } from "iconsax-react";
import Button from "../Button";
import type { Hotel } from "../../mocks/searchData";
import { X, ArrowsInSimple } from "@phosphor-icons/react";

interface SearchMapProps {
  hotels: Hotel[];
  selectedHotel?: string;
  onHotelSelect: (hotelId: string) => void;
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
  onClose?: () => void;
}

const SearchMap: React.FC<SearchMapProps> = ({
  hotels,
  selectedHotel,
  onHotelSelect,
  isFullscreen = false,
  onFullscreenToggle,
  onClose,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredHotel, setHoveredHotel] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock map center (Paris coordinates)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mapCenter = { lat: 48.8566, lng: 2.3522 };

  const handleMarkerClick = (hotelId: string) => {
    onHotelSelect(hotelId);
  };

  const handleMarkerHover = (hotelId: string | null) => {
    setHoveredHotel(hotelId);
  };

  const getMarkerColor = (hotel: Hotel) => {
    if (selectedHotel === hotel.id) return "#EF4444"; // Red for selected
    if (hoveredHotel === hotel.id) return "#F59E0B"; // Orange for hovered
    return "#3B82F6"; // Blue for default
  };

  const getPriceColor = (price: number) => {
    if (price < 100) return "bg-green-500";
    if (price < 200) return "bg-yellow-500";
    if (price < 300) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div
      className={`relative bg-gray-100 ${
        isFullscreen ? "fixed inset-0 z-50" : "h-full"
      }`}
    >
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full relative overflow-hidden rounded-lg"
      >
        {/* Loading State */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading map...</p>
            </div>
          </div>
        )}

        {/* Mock Map Background */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
          {/* Street Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="streets"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M 0 50 L 100 50" stroke="#374151" strokeWidth="1" />
                  <path d="M 50 0 L 50 100" stroke="#374151" strokeWidth="1" />
                  <path
                    d="M 0 25 L 100 25"
                    stroke="#6B7280"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 0 75 L 100 75"
                    stroke="#6B7280"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 25 0 L 25 100"
                    stroke="#6B7280"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 75 0 L 75 100"
                    stroke="#6B7280"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#streets)" />
            </svg>
          </div>

          {/* Hotel Markers */}
          {mapLoaded &&
            hotels.map((hotel, index) => {
              // Mock positioning based on hotel coordinates
              const xPos = 20 + (index % 4) * 20 + Math.random() * 10;
              const yPos = 20 + Math.floor(index / 4) * 25 + Math.random() * 10;

              return (
                <div
                  key={hotel.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    zIndex:
                      selectedHotel === hotel.id
                        ? 10
                        : hoveredHotel === hotel.id
                        ? 9
                        : 1,
                  }}
                  onClick={() => handleMarkerClick(hotel.id)}
                  onMouseEnter={() => handleMarkerHover(hotel.id)}
                  onMouseLeave={() => handleMarkerHover(null)}
                >
                  {/* Price Marker */}
                  <div
                    className={`relative ${getPriceColor(
                      hotel.price
                    )} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white`}
                  >
                    ${hotel.price}
                    {/* Marker Point */}
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                      style={{ borderTopColor: getMarkerColor(hotel) }}
                    />
                  </div>

                  {/* Hotel Info Popup */}
                  {(hoveredHotel === hotel.id ||
                    selectedHotel === hotel.id) && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl border p-3">
                      <div className="flex gap-3">
                        <img
                          src={hotel.images[0]}
                          alt={hotel.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm truncate">
                            {hotel.name}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                            <Location color="#6B7280" size={12} />
                            <span>{hotel.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                              {hotel.guestRating}
                            </span>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">
                                ${hotel.price}
                              </div>
                              <div className="text-xs text-gray-500">
                                per night
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {onFullscreenToggle && (
              <Button
                onClick={onFullscreenToggle}
                className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-lg border transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <ArrowsInSimple color="#374151" size={20} />
                ) : (
                  <Maximize4 color="#374151" size={20} />
                )}
              </Button>
            )}

            {onClose && isFullscreen && (
              <Button
                onClick={onClose}
                className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-lg border transition-colors"
                title="Close map"
              >
                <X color="#374151" size={20} />
              </Button>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded-lg shadow-lg border overflow-hidden">
            <Button className="px-3 py-2 hover:bg-gray-50 border-b text-gray-700 font-bold">
              +
            </Button>
            <Button className="px-3 py-2 hover:bg-gray-50 text-gray-700 font-bold">
              −
            </Button>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border p-3">
            <h4 className="font-bold text-gray-900 text-sm mb-2">
              Price Range
            </h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Under $100</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>$100 - $200</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>$200 - $300</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>$300+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMap;
