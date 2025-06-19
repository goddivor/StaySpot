// src/components/landing/HeroSection.tsx
import React, { useState, useEffect } from "react";
import { Calendar, Location, Profile2User, SearchNormal1 } from "iconsax-react";
import Button from "../Button";
import { Logo } from "../ui/logo";
import { getFeatureIcon } from "../../utils/iconService";
import { heroSlides, trustIndicators } from "../../mocks/landingData";

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchData, setSearchData] = useState<SearchData>({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Search form handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted:", searchData);
    window.location.href = "/search";
  };

  const handleInputChange = (
    field: keyof SearchData,
    value: string | number
  ) => {
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-40" />
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <nav className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <Logo size={48} className="text-white" />
          <span className="text-white text-2xl font-bold">StaySpot</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="text-white hover:text-white bg-transparent hover:bg-blue-600 border border-white border-opacity-30 hover:border-blue-600 px-4 py-2 rounded-full transition-all duration-300"
            onClick={() => (window.location.href = "/login")}
          >
            Sign In
          </Button>
          <Button
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 border border-white border-opacity-30 hover:border-blue-600"
            onClick={() => (window.location.href = "/register")}
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          {/* Current slide content */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {heroSlides[currentSlide]?.title || "Find Your Perfect Stay"}
            </h1>
            <p className="text-xl md:text-2xl mb-2 opacity-90">
              {heroSlides[currentSlide]?.subtitle ||
                "Discover exceptional hotels worldwide with instant booking"}
            </p>
            <p className="text-lg opacity-75">
              {heroSlides[currentSlide]?.location &&
                `Currently viewing: ${heroSlides[currentSlide].location}`}
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                {getFeatureIcon(indicator.icon, { size: 20, color: "#FFFFFF" })}
                <span className="text-sm font-medium">{indicator.title}</span>
              </div>
            ))}
          </div>

          {/* Search Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* Destination Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where to?
                </label>
                <div className="relative">
                  <Location
                    color="#6B7280"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchData.destination}
                    onChange={(e) =>
                      handleInputChange("destination", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar
                    color="#6B7280"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) =>
                      handleInputChange("checkIn", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar
                    color="#6B7280"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) =>
                      handleInputChange("checkOut", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Guests Selector */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <Profile2User
                    color="#6B7280"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <select
                    value={searchData.guests}
                    onChange={(e) =>
                      handleInputChange("guests", parseInt(e.target.value))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-black"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2 h-[52px]"
                >
                  <SearchNormal1 color="white" size={20} />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
