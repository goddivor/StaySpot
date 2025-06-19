// src/components/hotelDetails/RoomSelection.tsx
import React, { useState } from 'react';
import { 
  Profile2User, 
  I3Square, 
  ArrowRight2, 
  TickCircle,
  CloseCircle,
  InfoCircle,
  Eye
} from 'iconsax-react';
import Button from '../Button';
import { getAmenityIcon } from '../../utils/iconService';
import type { RoomType } from '../../mocks/hotelDetailsData';
import { Bed } from '@phosphor-icons/react';

interface RoomSelectionProps {
  roomTypes: RoomType[];
  selectedRoom: RoomType | null;
  onRoomSelect: (room: RoomType) => void;
  searchParams: {
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
  };
}

const RoomSelection: React.FC<RoomSelectionProps> = ({
  roomTypes,
  selectedRoom,
  onRoomSelect,
  searchParams
}) => {
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: string]: number }>({});

  const handleImageNavigation = (roomId: string, direction: 'prev' | 'next', imagesLength: number) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[roomId] || 0;
      const newIndex = direction === 'next' 
        ? (currentIndex + 1) % imagesLength
        : (currentIndex - 1 + imagesLength) % imagesLength;
      return { ...prev, [roomId]: newIndex };
    });
  };

  const getCancellationText = (policy: string) => {
    switch (policy) {
      case 'free':
        return { text: 'Free Cancellation', color: 'text-green-600', icon: TickCircle };
      case 'partial':
        return { text: 'Partial Refund', color: 'text-yellow-600', icon: InfoCircle };
      case 'non-refundable':
        return { text: 'Non-refundable', color: 'text-red-600', icon: CloseCircle };
      default:
        return { text: 'See policies', color: 'text-gray-600', icon: InfoCircle };
    }
  };

  const getAvailabilityText = (room: RoomType) => {
    if (!room.available) return 'Sold Out';
    if (room.availableRooms <= 3) return `Only ${room.availableRooms} left!`;
    return `${room.availableRooms} available`;
  };

  const getAvailabilityColor = (room: RoomType) => {
    if (!room.available) return 'text-red-600';
    if (room.availableRooms <= 3) return 'text-orange-600';
    return 'text-green-600';
  };

  const calculateNights = () => {
    const checkIn = new Date(searchParams.checkIn);
    const checkOut = new Date(searchParams.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Room</h2>
      
      {/* Search Summary */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <strong>{nights} nights</strong> ({searchParams.checkIn} - {searchParams.checkOut})
          </span>
          <span className="flex items-center gap-1">
            <Profile2User color="#374151" size={16} />
            <strong>{searchParams.guests} guests</strong>
          </span>
          <span><strong>{searchParams.rooms} room</strong></span>
        </div>
      </div>

      {/* Room Types */}
      <div className="space-y-6">
        {roomTypes.map((room) => {
          const isExpanded = expandedRoom === room.id;
          const currentImageIndex = currentImageIndices[room.id] || 0;
          const cancellation = getCancellationText(room.cancellationPolicy);
          const isSelected = selectedRoom?.id === room.id;

          return (
            <div 
              key={room.id} 
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                isSelected 
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-500 ring-opacity-20' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  
                  {/* Room Images */}
                  <div className="lg:col-span-1">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={room.images[currentImageIndex]}
                        alt={`${room.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image Navigation */}
                      {room.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageNavigation(room.id, 'prev', room.images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <ArrowRight2 color="white" size={16} className="rotate-180" />
                          </button>
                          <button
                            onClick={() => handleImageNavigation(room.id, 'next', room.images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <ArrowRight2 color="white" size={16} />
                          </button>

                          {/* Image dots */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {room.images.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* View Photos Button */}
                      <button
                        onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 transition-colors flex items-center gap-1"
                      >
                        <Eye color="white" size={12} />
                        {room.images.length} photos
                      </button>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="lg:col-span-2">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                      <p className="text-gray-600 mb-3">{room.description}</p>
                      
                      {/* Room specs */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                        <div className="flex items-center gap-1">
                          <I3Square color="#6B7280" size={16} />
                          <span>{room.size} m²</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed color="#6B7280" size={16} />
                          <span>{room.bedConfiguration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Profile2User color="#6B7280" size={16} />
                          <span>Max {room.maxOccupancy} guests</span>
                        </div>
                      </div>

                      {/* Room features */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Room Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {room.roomFeatures.map((feature, index) => (
                            <span 
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Room Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {room.amenities.slice(0, 6).map((amenity) => (
                            <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                              {getAmenityIcon(amenity, { size: 14, color: '#6B7280' })}
                              <span className="capitalize">{amenity.replace('-', ' ')}</span>
                            </div>
                          ))}
                          {room.amenities.length > 6 && (
                            <button
                              onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
                              className="text-blue-600 text-sm font-medium"
                            >
                              +{room.amenities.length - 6} more amenities
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Special offers */}
                      {room.specialOffers && room.specialOffers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {room.specialOffers.map((offer, index) => (
                            <span 
                              key={index}
                              className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium"
                            >
                              {offer}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Booking */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-4 h-fit">
                      {/* Availability */}
                      <div className="mb-3">
                        <span className={`text-sm font-medium ${getAvailabilityColor(room)}`}>
                          {getAvailabilityText(room)}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4">
                        {room.discountedPrice ? (
                          <div>
                            <span className="text-lg text-gray-500 line-through">
                              ${room.basePrice}
                            </span>
                            <div className="text-2xl font-bold text-gray-900">
                              ${room.discountedPrice}
                            </div>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-gray-900">
                            ${room.basePrice}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">per night</div>
                        
                        {/* Total for stay */}
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span>Total for {nights} nights:</span>
                            <span className="font-bold">
                              ${(room.discountedPrice || room.basePrice) * nights}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cancellation policy */}
                      <div className="mb-4">
                        <div className={`flex items-center gap-1 text-sm ${cancellation.color}`}>
                          <cancellation.icon color="currentColor" size={14} />
                          <span>{cancellation.text}</span>
                        </div>
                      </div>

                      {/* Select button */}
                      <Button
                        onClick={() => onRoomSelect(room)}
                        disabled={!room.available}
                        className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                          !room.available
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isSelected
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {!room.available 
                          ? 'Sold Out' 
                          : isSelected 
                          ? 'Selected ✓' 
                          : 'Select Room'
                        }
                      </Button>

                      {/* More details link */}
                      <button
                        onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
                        className="w-full mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'More details'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {/* All images */}
                    {room.images.length > 1 && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Room Photos</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {room.images.map((image, index) => (
                            <div 
                              key={index}
                              className="aspect-square rounded-lg overflow-hidden"
                            >
                              <img
                                src={image}
                                alt={`${room.name} - View ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* All amenities */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">All Room Amenities</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {room.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                            {getAmenityIcon(amenity, { size: 16, color: '#6B7280' })}
                            <span className="capitalize">{amenity.replace('-', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Room policies */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Room Policies</h4>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Cancellation:</span> {cancellation.text}
                          </div>
                          <div>
                            <span className="font-medium">Max Occupancy:</span> {room.maxOccupancy} guests
                          </div>
                          <div>
                            <span className="font-medium">Bed Type:</span> {room.bedConfiguration}
                          </div>
                          <div>
                            <span className="font-medium">Room Size:</span> {room.size} m²
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedRoom && (
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Your Selection</h3>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-medium text-gray-900">{selectedRoom.name}</div>
              <div className="text-sm text-gray-600">
                {selectedRoom.bedConfiguration} • {selectedRoom.size}m² • Max {selectedRoom.maxOccupancy} guests
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {nights} nights: {searchParams.checkIn} - {searchParams.checkOut}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${(selectedRoom.discountedPrice || selectedRoom.basePrice) * nights}
              </div>
              <div className="text-sm text-gray-600">Total for stay</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;