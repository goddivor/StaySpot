/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/iconService.tsx
import React from "react";
import {
  Wifi,
  // Swimming,
  //   Massager,
  Weight,
  Shop,
  Car,
  Coffee,
  People,
  Call,
  MessageQuestion,
  Personalcard,
  Security,
  MoneyRecive,
  Mouse,
  Headphone,
  //   PriceTag,
  ShieldTick,
  Clock,
  Star1,
  Location,
  Heart,
  Eye,
  Calendar,
  Profile2User,
  Home,
  SearchNormal1,
  ArrowRight,
} from "iconsax-react";

// Temporary replacement for Swimming icon
const Swimming = Shop;
const Massager = Shop; // Temporary replacement for Massager icon
const PriceTag = Shop; // Temporary replacement for PriceTag icon

// Icon mapping for amenities
const amenityIconMap: Record<string, React.ComponentType<any>> = {
  wifi: Wifi,
  pool: Swimming,
  spa: Massager,
  gym: Weight,
  restaurant: Shop,
  parking: Car,
  bar: Coffee,
  concierge: People,
  "room-service": Call,
  beach: Swimming,
  yoga: Personalcard,
  laundry: MessageQuestion,
  "pet-friendly": Heart,
  "air-conditioning": Wifi, // Using Wifi as placeholder
  elevator: Security,
  "business-center": Shop,
  "meeting-rooms": People,
  kitchen: Coffee,
  balcony: Home,
  "ocean-view": Eye,
  "city-view": Location,
  "mountain-view": Location,
  "garden-view": Home,
  "free-breakfast": Coffee,
  "airport-shuttle": Car,
  "dry-cleaning": MessageQuestion,
  safe: Security,
  minibar: Coffee,
  "flat-screen-tv": Eye,
  "private-bathroom": Home,
  "hair-dryer": Personalcard,
  bathrobes: Personalcard,
  slippers: Personalcard,
  "wake-up-service": Clock,
  newspaper: MessageQuestion,
  "iron-ironing-board": Home,
  "work-desk": Shop,
  "seating-area": Home,
  "dining-area": Shop,
  terrace: Home,
  "hot-tub": Swimming,
  sauna: Massager,
  "fitness-center": Weight,
  "indoor-pool": Swimming,
  "outdoor-pool": Swimming,
  "kids-club": People,
  "game-room": People,
  library: Shop,
  "gift-shop": Shop,
  atm: MoneyRecive,
  "currency-exchange": MoneyRecive,
  "tour-desk": People,
  "luggage-storage": Security,
  "express-check-in-out": Clock,
  "non-smoking": Security,
  "wheelchair-accessible": Personalcard,
  "family-rooms": Home,
  "soundproof-rooms": Security,
  "hypoallergenic-rooms": Security,
  "smoking-area": Security,
  "electric-vehicle-charging": Car,
  "bicycle-rental": Car,
  "car-rental": Car,
  "skiing-equipment-rental": Car,
  "water-sports": Swimming,
  fishing: Swimming,
  hiking: Weight,
  "golf-course": Weight,
  "tennis-court": Weight,
  "volleyball-court": Weight,
  "basketball-court": Weight,
  "table-tennis": Weight,
  billiards: Weight,
  darts: Weight,
  karaoke: Coffee,
  "live-music": Coffee,
  nightclub: Coffee,
  casino: People,
  arcade: People,
  playground: People,
  babysitting: People,
  childcare: People,
  "kids-meals": Coffee,
  "family-entertainment": People,
  "seasonal-outdoor-pool": Swimming,
  "heated-pool": Swimming,
  "infinity-pool": Swimming,
  "rooftop-pool": Swimming,
  "adults-only-pool": Swimming,
  "pool-bar": Coffee,
  "pool-towels": Swimming,
  "sun-loungers": Swimming,
  umbrellas: Swimming,
  "pool-games": Swimming,
  "water-slide": Swimming,
  "lazy-river": Swimming,
  "wave-pool": Swimming,
  whirlpool: Swimming,
  "thermal-baths": Swimming,
  "turkish-bath": Massager,
  "steam-room": Massager,
  "massage-treatments": Massager,
  "facial-treatments": Massager,
  "body-treatments": Massager,
  aromatherapy: Massager,
  reflexology: Massager,
  "hot-stone-massage": Massager,
  "couples-massage": Massager,
  "beauty-salon": Personalcard,
  "hair-salon": Personalcard,
  "nail-salon": Personalcard,
  "tanning-bed": Personalcard,
  solarium: Personalcard,
  "meditation-room": Personalcard,
  "yoga-classes": Personalcard,
  "pilates-classes": Weight,
  "aerobics-classes": Weight,
  "personal-trainer": Weight,
  "group-fitness": Weight,
  "spinning-classes": Weight,
  "aqua-aerobics": Swimming,
  "dance-classes": Weight,
  "martial-arts": Weight,
  "rock-climbing-wall": Weight,
  "squash-court": Weight,
  "badminton-court": Weight,
  "ping-pong": Weight,
  foosball: Weight,
  chess: People,
  "board-games": People,
};

// Icon mapping for general features
const featureIconMap: Record<string, React.ComponentType<any>> = {
  "shield-check": ShieldTick,
  "money-back": MoneyRecive,
  "24-7": Clock,
  "price-tag": PriceTag,
  "mouse-click": Mouse,
  headset: Headphone,
  star: Star1,
  location: Location,
  heart: Heart,
  search: SearchNormal1,
  calendar: Calendar,
  users: Profile2User,
  home: Home,
  "arrow-right": ArrowRight,
  clock: Clock,
  security: Security,
};

// Main function to get amenity icon
export const getAmenityIcon = (
  amenityName: string,
  props?: {
    size?: number;
    color?: string;
    className?: string;
    variant?: "Linear" | "Outline" | "Bold" | "Broken" | "TwoTone" | "Bulk";
  }
) => {
  const IconComponent = amenityIconMap[amenityName.toLowerCase()] || Shop; // Default to Shop icon
  const {
    size = 20,
    color = "#6B7280",
    className = "",
    variant = "Outline",
  } = props || {};

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      variant={variant}
    />
  );
};

// Main function to get feature icon
export const getFeatureIcon = (
  featureName: string,
  props?: {
    size?: number;
    color?: string;
    className?: string;
    variant?: "Linear" | "Outline" | "Bold" | "Broken" | "TwoTone" | "Bulk";
  }
) => {
  const IconComponent = featureIconMap[featureName.toLowerCase()] || Star1; // Default to Star icon
  const {
    size = 24,
    color = "#4F46E5",
    className = "",
    variant = "Bold",
  } = props || {};

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      variant={variant}
    />
  );
};

// Function to get star rating display
export const getStarRating = (rating: number, maxRating: number = 5) => {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star1
        key={i}
        size={16}
        color={i <= rating ? "#FBBF24" : "#E5E7EB"}
        className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        variant={i <= rating ? "Bold" : "Outline"}
      />
    );
  }
  return stars;
};

// Helper function to get multiple amenity icons
export const getAmenityIcons = (
  amenities: string[],
  maxDisplay: number = 5,
  iconProps?: {
    size?: number;
    color?: string;
    className?: string;
    variant?: "Linear" | "Outline" | "Bold" | "Broken" | "TwoTone" | "Bulk";
  }
) => {
  const displayAmenities = amenities.slice(0, maxDisplay);
  const remainingCount = amenities.length - maxDisplay;

  return {
    icons: displayAmenities.map((amenity) => ({
      name: amenity,
      icon: getAmenityIcon(amenity, iconProps),
    })),
    remainingCount: remainingCount > 0 ? remainingCount : 0,
  };
};

export default {
  getAmenityIcon,
  getFeatureIcon,
  getStarRating,
  getAmenityIcons,
};
