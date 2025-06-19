// src/components/search/HotelCard.tsx
import React, { useState } from "react";
import {
  Heart,
  Location,
  TickCircle,
  Flash,
  Eye,
  ArrowRight2,
} from "iconsax-react";
import Button from "../Button";
import { getStarRating, getAmenityIcon } from "../../utils/iconService";
import type { Hotel } from "../../mocks/searchData";

interface HotelCardProps {
  hotel: Hotel;
  viewMode: "grid" | "list";
  onHotelClick: (hotelId: string) => void;
  onFavoriteClick: (hotelId: string, isFavorited: boolean) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  viewMode,
  onHotelClick,
  onFavoriteClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavoriteClick(hotel.id, !isFavorited);
  };

  const handleImageNavigation = (
    e: React.MouseEvent,
    direction: "prev" | "next"
  ) => {
    e.stopPropagation();
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + hotel.images.length) % hotel.images.length
      );
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHotelClick(hotel.id);
  };

  const getCancellationBadge = () => {
    switch (hotel.cancellationPolicy) {
      case "free":
        return {
          text: "Free Cancellation",
          color: "bg-green-100 text-green-800",
        };
      case "partial":
        return {
          text: "Partial Refund",
          color: "bg-yellow-100 text-yellow-800",
        };
      case "non-refundable":
        return { text: "Non-refundable", color: "bg-red-100 text-red-800" };
      default:
        return null;
    }
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return "Exceptional";
    if (rating >= 8) return "Excellent";
    if (rating >= 7) return "Very Good";
    if (rating >= 6) return "Good";
    return "Fair";
  };

  if (viewMode === "grid") {
    return (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
        onClick={() => onHotelClick(hotel.id)}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />

          {/* Image Navigation */}
          {hotel.images.length > 1 && (
            <>
              <button
                onClick={(e) => handleImageNavigation(e, "prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight2 color="white" size={16} className="rotate-180" />
              </button>
              <button
                onClick={(e) => handleImageNavigation(e, "next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight2 color="white" size={16} />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {hotel.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-white transition-all"
          >
            <Heart
              color={isFavorited ? "#EF4444" : "#6B7280"}
              size={20}
              variant={isFavorited ? "Bold" : "Outline"}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {hotel.deals &&
              hotel.deals.map((deal, index) => (
                <span
                  key={index}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
                >
                  {deal}
                </span>
              ))}
            {hotel.instantBooking && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <Flash color="white" size={12} />
                Instant
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                <Location color="#6B7280" size={14} />
                <span>
                  {hotel.location} • {hotel.distanceFromCenter}km from center
                </span>
              </div>
            </div>
            <div className="flex">{getStarRating(hotel.starRating)}</div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
              {hotel.guestRating}
            </span>
            <span className="text-sm text-gray-600">
              {getRatingLabel(hotel.guestRating)} ({hotel.reviewCount} reviews)
            </span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-3">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-1 text-gray-600"
              >
                {getAmenityIcon(amenity, { size: 14, color: "#6B7280" })}
                <span className="text-xs capitalize">
                  {amenity.replace("-", " ")}
                </span>
              </div>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs text-blue-600 font-medium">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Policy Badge */}
          {getCancellationBadge() && (
            <div className="mb-3">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  getCancellationBadge()?.color
                }`}
              >
                {getCancellationBadge()?.text}
              </span>
            </div>
          )}

          {/* Price and Book Button */}
          <div className="flex justify-between items-center">
            <div>
              {hotel.originalPrice && (
                <span className="text-sm text-gray-500 line-through mr-2">
                  ${hotel.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ${hotel.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">per night</span>
            </div>
            <Button
              onClick={handleBookNow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Book Now
            </Button>
          </div>

          {/* Last Booked */}
          {hotel.lastBooked && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <TickCircle color="#DC2626" size={12} />
              Last booked {hotel.lastBooked}
            </p>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => onHotelClick(hotel.id)}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-48 md:h-auto flex-shrink-0 flex-grow md:flex-grow-0 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />

          {/* Image Navigation */}
          {hotel.images.length > 1 && (
            <>
              <button
                onClick={(e) => handleImageNavigation(e, "prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight2 color="white" size={16} className="rotate-180" />
              </button>
              <button
                onClick={(e) => handleImageNavigation(e, "next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight2 color="white" size={16} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                <Eye color="white" size={12} className="inline mr-1" />
                {currentImageIndex + 1}/{hotel.images.length}
              </div>
            </>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-white transition-all"
          >
            <Heart
              color={isFavorited ? "#EF4444" : "#6B7280"}
              size={20}
              variant={isFavorited ? "Bold" : "Outline"}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {hotel.deals &&
              hotel.deals.map((deal, index) => (
                <span
                  key={index}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
                >
                  {deal}
                </span>
              ))}
            {hotel.instantBooking && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <Flash color="white" size={12} />
                Instant
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl text-gray-900">
                  {hotel.name}
                </h3>
                <div className="flex">{getStarRating(hotel.starRating)}</div>
              </div>
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <Location color="#6B7280" size={16} />
                <span>
                  {hotel.location} • {hotel.distanceFromCenter}km from center
                </span>
              </div>
              <p className="text-sm text-gray-600">{hotel.address}</p>
            </div>

            <div className="text-right">
              {hotel.originalPrice && (
                <span className="text-lg text-gray-500 line-through block">
                  ${hotel.originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                ${hotel.price}
              </span>
              <span className="text-sm text-gray-500 block">per night</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 flex-1">
            <div className="flex-1">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold">
                  {hotel.guestRating}
                </span>
                <span className="text-gray-600">
                  {getRatingLabel(hotel.guestRating)} ({hotel.reviewCount}{" "}
                  reviews)
                </span>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-3 mb-3">
                {hotel.amenities.slice(0, 6).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-1 text-gray-600"
                  >
                    {getAmenityIcon(amenity, { size: 16, color: "#6B7280" })}
                    <span className="text-sm capitalize">
                      {amenity.replace("-", " ")}
                    </span>
                  </div>
                ))}
                {hotel.amenities.length > 6 && (
                  <span className="text-sm text-blue-600 font-medium">
                    +{hotel.amenities.length - 6} more amenities
                  </span>
                )}
              </div>

              {/* Popular Features */}
              {hotel.popularFeatures && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Popular Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.popularFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies and Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {getCancellationBadge() && (
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      getCancellationBadge()?.color
                    }`}
                  >
                    {getCancellationBadge()?.text}
                  </span>
                )}
                {hotel.breakfastIncluded && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Breakfast Included
                  </span>
                )}
                {hotel.instantBooking && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Flash color="#EA580C" size={12} />
                    Instant Booking
                  </span>
                )}
              </div>

              {/* Last Booked */}
              {hotel.lastBooked && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <TickCircle color="#DC2626" size={14} />
                  Last booked {hotel.lastBooked}
                </p>
              )}
            </div>

            {/* Action Button */}
            <div className="flex flex-col items-end gap-2">
              <Button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Book Now
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onHotelClick(hotel.id);
                }}
                className="text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-50 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
