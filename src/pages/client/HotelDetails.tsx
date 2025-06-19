/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/client/HotelDetails.tsx
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share,
  Location,
  Star1,
  Call,
  Wifi,
  Car,
  Award,
  InfoCircle,
  TickCircle,
  Calendar,
  Profile2User,
  Map1,
  Clock,
  SecuritySafe,
  DirectboxNotif,
} from "iconsax-react";
import { useToast } from "../../context/toast-context";
import Button from "../../components/Button";
import { Logo } from "../../components/ui/logo";
import { getStarRating, getAmenityIcon } from "../../utils/iconService";
import {
  mockHotelDetails,
  type DetailedHotel,
  type RoomType,
} from "../../mocks/hotelDetailsData";

// Lazy load components for better performance
const ImageGallery = React.lazy(
  () => import("../../components/hotelDetails/ImageGallery")
);
const RoomSelection = React.lazy(
  () => import("../../components/hotelDetails/RoomSelection")
);
const ReviewsSection = React.lazy(
  () => import("../../components/hotelDetails/ReviewsSection")
);
const LocationSection = React.lazy(
  () => import("../../components/hotelDetails/LocationSection")
);
const PoliciesSection = React.lazy(
  () => import("../../components/hotelDetails/PoliciesSection")
);

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { success, error } = useToast();

  // State management
  const [hotel, setHotel] = useState<DetailedHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);

  // Search params (would come from URL in real app)
  const [searchParams] = useState({
    checkIn: "2025-07-15",
    checkOut: "2025-07-18",
    guests: 2,
    rooms: 1,
  });

  // Load hotel data
  useEffect(() => {
    const loadHotelData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (id === "1") {
          setHotel(mockHotelDetails);
        } else {
          throw new Error("Hotel not found");
        }
      } catch (err) {
        error("Hotel not found", "The hotel you're looking for doesn't exist.");
        navigate("/search");
      } finally {
        setLoading(false);
      }
    };

    loadHotelData();
  }, [id, navigate, error]);

  // Handle sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Event handlers
  const handleBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      success("Added to favorites", `${hotel?.name} saved to your favorites`);
    } else {
      success(
        "Removed from favorites",
        `${hotel?.name} removed from favorites`
      );
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: hotel?.name,
          text: `Check out ${hotel?.name} on StaySpot`,
          url: window.location.href,
        });
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        success("Link copied", "Hotel link copied to clipboard");
      }
    } catch (err) {
      error("Share failed", "Unable to share hotel");
    }
  };

  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoomType(room);
    success("Room selected", `${room.name} selected`);
  };

  const handleBookNow = () => {
    if (selectedRoomType) {
      navigate(`/book/${id}/guest-details`, {
        state: {
          hotel,
          roomType: selectedRoomType,
          searchParams,
        },
      });
    } else {
      error("No room selected", "Please select a room type to continue");
    }
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return "Exceptional";
    if (rating >= 8) return "Excellent";
    if (rating >= 7) return "Very Good";
    if (rating >= 6) return "Good";
    return "Fair";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "bg-green-600";
    if (rating >= 8) return "bg-blue-600";
    if (rating >= 7) return "bg-indigo-600";
    if (rating >= 6) return "bg-yellow-600";
    return "bg-gray-600";
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft color="#374151" size={24} />
              </Button>
              <div className="flex items-center gap-3">
                <Logo size={32} />
                <span
                  className="text-lg font-bold text-gray-900 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  StaySpot
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share color="#374151" size={20} />
              </Button>
              <Button
                onClick={handleFavoriteToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart
                  color={isFavorited ? "#EF4444" : "#374151"}
                  size={20}
                  variant={isFavorited ? "Bold" : "Outline"}
                />
              </Button>
              <Button className="text-gray-700 hover:text-blue-600 bg-transparent hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      {isSticky && (
        <div className="fixed top-20 left-0 right-0 bg-white shadow-lg z-30 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Location color="#6B7280" size={14} />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    $
                    {selectedRoomType?.discountedPrice ||
                      selectedRoomType?.basePrice ||
                      hotel.roomTypes[0].basePrice}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
                <Button
                  onClick={handleBookNow}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{getStarRating(hotel.starRating)}</div>
                <span className="text-sm text-gray-600 ml-2">
                  {hotel.starRating}-star hotel
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {hotel.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Location color="#6B7280" size={16} />
                  <span className="text-gray-600">{hotel.address}</span>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  {hotel.distanceFromCenter}km from city center
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`${getRatingColor(
                      hotel.guestRating
                    )} text-white px-3 py-1 rounded font-bold`}
                  >
                    {hotel.guestRating}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getRatingLabel(hotel.guestRating)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {hotel.reviewCount} reviews
                    </div>
                  </div>
                </div>

                {hotel.awards.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Award color="#F59E0B" size={16} />
                    <span className="text-sm text-gray-600">
                      {hotel.awards[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Features */}
              <div className="flex flex-wrap gap-3 mb-6">
                {hotel.freeBreakfast && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <TickCircle color="#16A34A" size={14} />
                    Free Breakfast
                  </span>
                )}
                {hotel.freeCancellation && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    <TickCircle color="#2563EB" size={14} />
                    Free Cancellation
                  </span>
                )}
                {hotel.instantBooking && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    <TickCircle color="#EA580C" size={14} />
                    Instant Booking
                  </span>
                )}
                {hotel.bestPriceGuarantee && (
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    <SecuritySafe color="#9333EA" size={14} />
                    Best Price Guarantee
                  </span>
                )}
              </div>
            </div>

            {/* Booking Card */}
            <div className="w-full lg:w-96 bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  {selectedRoomType?.discountedPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${selectedRoomType.basePrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    $
                    {selectedRoomType?.discountedPrice ||
                      selectedRoomType?.basePrice ||
                      hotel.roomTypes[0].basePrice}
                  </span>
                  <span className="text-gray-600">per night</span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedRoomType
                    ? selectedRoomType.name
                    : "Select a room to see pricing"}
                </p>
              </div>

              {/* Search Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Check-in</div>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar color="#374151" size={14} />
                      {searchParams.checkIn}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Check-out</div>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar color="#374151" size={14} />
                      {searchParams.checkOut}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Guests</div>
                    <div className="font-medium flex items-center gap-1">
                      <Profile2User color="#374151" size={14} />
                      {searchParams.guests} guests
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Rooms</div>
                    <div className="font-medium">{searchParams.rooms} room</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleBookNow}
                disabled={!selectedRoomType}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedRoomType
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedRoomType ? "Book Now" : "Select a Room First"}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Free cancellation until 24 hours before check-in
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8" id="gallery">
          <Suspense
            fallback={
              <div className="h-96 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-gray-500">Loading images...</div>
              </div>
            }
          >
            <ImageGallery
              images={hotel.images}
              hotelName={hotel.name}
              onImageClick={(index) => {
                setCurrentImageIndex(index);
                setShowAllImages(true);
              }}
            />
          </Suspense>
        </div>

        {/* Navigation Menu */}
        <div className="mb-8">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {[
              { id: "overview", label: "Overview", icon: InfoCircle },
              { id: "rooms", label: "Rooms & Rates", icon: SecuritySafe },
              { id: "amenities", label: "Amenities", icon: Wifi },
              { id: "location", label: "Location", icon: Map1 },
              { id: "reviews", label: "Reviews", icon: Star1 },
              { id: "policies", label: "Policies", icon: DirectboxNotif },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <item.icon
                  color={activeSection === item.id ? "#2563EB" : "#6B7280"}
                  size={18}
                />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About This Hotel
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-gray-700 leading-relaxed mb-6">
                {hotel.description}
              </p>

              {/* Popular Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.popularAmenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      {getAmenityIcon(amenity, { size: 18, color: "#059669" })}
                      <span className="text-sm capitalize">
                        {amenity.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Languages Spoken
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.languages.map((language) => (
                    <span
                      key={language}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Hotel Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Established</span>
                    <span className="font-medium">{hotel.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rooms</span>
                    <span className="font-medium">{hotel.totalRooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floors</span>
                    <span className="font-medium">{hotel.floors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">
                      {hotel.propertyType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Weather */}
              {hotel.currentWeather && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Current Weather
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">☁️</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {hotel.currentWeather.temperature}°C
                      </div>
                      <div className="text-gray-600">
                        {hotel.currentWeather.condition}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="mb-12">
          <Suspense
            fallback={
              <div className="h-64 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-gray-500">Loading rooms...</div>
              </div>
            }
          >
            <RoomSelection
              roomTypes={hotel.roomTypes}
              selectedRoom={selectedRoomType}
              onRoomSelect={handleRoomSelect}
              searchParams={searchParams}
            />
          </Suspense>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Amenities & Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* General Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Wifi color="#059669" size={20} />
                General Amenities
              </h3>
              <div className="space-y-2">
                {hotel.amenities.slice(0, 8).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    {getAmenityIcon(amenity, { size: 16, color: "#6B7280" })}
                    <span className="text-sm capitalize">
                      {amenity.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Call color="#059669" size={20} />
                Business Services
              </h3>
              <div className="space-y-2">
                {hotel.businessAmenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    {getAmenityIcon(amenity, { size: 16, color: "#6B7280" })}
                    <span className="text-sm capitalize">
                      {amenity.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recreation */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Car color="#059669" size={20} />
                Recreation
              </h3>
              <div className="space-y-2">
                {hotel.recreationAmenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    {getAmenityIcon(amenity, { size: 16, color: "#6B7280" })}
                    <span className="text-sm capitalize">
                      {amenity.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Restaurants */}
          {hotel.restaurants.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Dining Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotel.restaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {restaurant.name}
                    </h4>
                    <p className="text-blue-600 text-sm font-medium mb-2">
                      {restaurant.cuisine}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {restaurant.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock color="#6B7280" size={14} />
                        {restaurant.hours}
                      </span>
                      <span className="font-medium text-gray-900">
                        {restaurant.priceRange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Location Section */}
        <section id="location" className="mb-12">
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-gray-500">Loading map...</div>
              </div>
            }
          >
            <LocationSection
              hotel={hotel}
              nearbyAttractions={hotel.nearbyAttractions}
            />
          </Suspense>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="mb-12">
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-gray-500">Loading reviews...</div>
              </div>
            }
          >
            <ReviewsSection
              hotel={hotel}
              reviews={hotel.reviews}
              reviewsBreakdown={hotel.reviewsBreakdown}
              categoryRatings={hotel.categoryRatings}
            />
          </Suspense>
        </section>

        {/* Policies Section */}
        <section id="policies" className="mb-12">
          <Suspense
            fallback={
              <div className="h-64 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-gray-500">Loading policies...</div>
              </div>
            }
          >
            <PoliciesSection policies={hotel.policies} />
          </Suspense>
        </section>
      </div>

      {/* Bottom Booking Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              $
              {selectedRoomType?.discountedPrice ||
                selectedRoomType?.basePrice ||
                hotel.roomTypes[0].basePrice}
            </div>
            <div className="text-sm text-gray-600">per night</div>
          </div>
          <Button
            onClick={handleBookNow}
            disabled={!selectedRoomType}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedRoomType
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
