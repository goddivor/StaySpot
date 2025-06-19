/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/search/SearchFilters.tsx
import React, { useState } from "react";
import { Refresh } from "iconsax-react";
import Button from "../Button";
import { getStarRating, getAmenityIcon } from "../../utils/iconService";
import {
  type SearchFilters as SearchFiltersType,
  neighborhoods,
  propertyTypes,
  popularAmenities,
} from "../../mocks/searchData";
import { X } from "@phosphor-icons/react";

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  resultsCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  resultsCount,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleArrayFilter = (
    key: keyof SearchFiltersType,
    value: string,
    checked: boolean
  ) => {
    const currentArray = localFilters[key] as string[];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    handleFilterChange(key, newArray);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...localFilters.priceRange] as [number, number];
    newRange[index] = value;
    handleFilterChange("priceRange", newRange);
  };

  const handleStarRating = (rating: number, checked: boolean) => {
    const newRatings = checked
      ? [...localFilters.starRating, rating]
      : localFilters.starRating.filter((r) => r !== rating);
    handleFilterChange("starRating", newRatings);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: SearchFiltersType = {
      priceRange: [0, 1000],
      starRating: [],
      guestRating: 0,
      propertyTypes: [],
      amenities: [],
      neighborhoods: [],
      cancellationPolicy: [],
      mealPlans: [],
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 right-0 lg:right-auto h-full lg:h-auto w-80 bg-white shadow-xl lg:shadow-none z-50 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleResetFilters}
              className="text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-50 px-3 py-1 rounded text-sm"
            >
              <Refresh color="#2563EB" size={16} className="mr-1" />
              Reset
            </Button>
            <Button onClick={onClose} className="lg:hidden p-1">
              <X color="#6B7280" size={24} />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>${localFilters.priceRange[0]}</span>
                <span>${localFilters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={localFilters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Hotel Star Rating
            </h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.starRating.includes(rating)}
                    onChange={(e) => handleStarRating(rating, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex">{getStarRating(rating)}</div>
                    <span className="text-sm text-gray-700">
                      {rating} Star{rating > 1 ? "s" : ""}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Guest Rating */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Guest Rating</h4>
            <div className="space-y-2">
              {[9, 8, 7, 6].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="radio"
                    name="guestRating"
                    checked={localFilters.guestRating === rating}
                    onChange={() => handleFilterChange("guestRating", rating)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {rating}+ Excellent
                  </span>
                </label>
              ))}
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="guestRating"
                  checked={localFilters.guestRating === 0}
                  onChange={() => handleFilterChange("guestRating", 0)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Any Rating</span>
              </label>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Property Type</h4>
            <div className="space-y-2">
              {propertyTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={localFilters.propertyTypes.includes(type.value)}
                      onChange={(e) =>
                        handleArrayFilter(
                          "propertyTypes",
                          type.value,
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">({type.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Neighborhoods</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {neighborhoods.map((neighborhood) => (
                <label
                  key={neighborhood.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={localFilters.neighborhoods.includes(
                        neighborhood.id
                      )}
                      onChange={(e) =>
                        handleArrayFilter(
                          "neighborhoods",
                          neighborhood.id,
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm text-gray-700">
                        {neighborhood.name}
                      </span>
                      <div className="text-xs text-gray-500">
                        Avg. ${neighborhood.averagePrice}/night
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({neighborhood.hotelCount})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {popularAmenities.map((amenity) => (
                <label
                  key={amenity.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={localFilters.amenities.includes(amenity.value)}
                      onChange={(e) =>
                        handleArrayFilter(
                          "amenities",
                          amenity.value,
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      {getAmenityIcon(amenity.value, {
                        size: 16,
                        color: "#6B7280",
                      })}
                      <span className="text-sm text-gray-700">
                        {amenity.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({amenity.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Cancellation Policy
            </h4>
            <div className="space-y-2">
              {[
                { value: "free", label: "Free Cancellation" },
                { value: "partial", label: "Partial Refund" },
                { value: "non-refundable", label: "Non-refundable" },
              ].map((policy) => (
                <label
                  key={policy.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.cancellationPolicy.includes(
                      policy.value
                    )}
                    onChange={(e) =>
                      handleArrayFilter(
                        "cancellationPolicy",
                        policy.value,
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{policy.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Meal Plans */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Meal Plans</h4>
            <div className="space-y-2">
              {[
                { value: "breakfast", label: "Breakfast Included" },
                { value: "half-board", label: "Half Board" },
                { value: "full-board", label: "Full Board" },
                { value: "all-inclusive", label: "All Inclusive" },
              ].map((meal) => (
                <label
                  key={meal.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.mealPlans.includes(meal.value)}
                    onChange={(e) =>
                      handleArrayFilter(
                        "mealPlans",
                        meal.value,
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{meal.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Show {resultsCount} Properties
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;
