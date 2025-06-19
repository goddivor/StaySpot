// src/mocks/searchData.ts

export interface Hotel {
  id: string;
  name: string;
  starRating: number;
  location: string;
  address: string;
  distanceFromCenter: number;
  images: string[];
  price: number;
  originalPrice?: number;
  guestRating: number;
  reviewCount: number;
  amenities: string[];
  roomTypes: string[];
  cancellationPolicy: 'free' | 'partial' | 'non-refundable';
  breakfastIncluded: boolean;
  instantBooking: boolean;
  propertyType: 'hotel' | 'resort' | 'apartment' | 'guesthouse' | 'villa';
  coordinates: { lat: number; lng: number };
  deals?: string[];
  lastBooked?: string;
  popularFeatures?: string[];
}

export interface SearchFilters {
  priceRange: [number, number];
  starRating: number[];
  guestRating: number;
  propertyTypes: string[];
  amenities: string[];
  neighborhoods: string[];
  cancellationPolicy: string[];
  mealPlans: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  hotelCount: number;
  averagePrice: number;
}

// Mock search results data
export const searchResults: Hotel[] = [
  {
    id: "1",
    name: "The Grand Palace Hotel",
    starRating: 5,
    location: "Paris City Center",
    address: "123 Champs-Élysées, 75008 Paris",
    distanceFromCenter: 0.2,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop"
    ],
    price: 295,
    originalPrice: 350,
    guestRating: 9.2,
    reviewCount: 1834,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "bar", "room-service", "concierge"],
    roomTypes: ["Deluxe Room", "Executive Suite", "Presidential Suite"],
    cancellationPolicy: "free",
    breakfastIncluded: true,
    instantBooking: true,
    propertyType: "hotel",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    deals: ["Early Bird 20% Off", "Free Breakfast"],
    lastBooked: "2 hours ago",
    popularFeatures: ["City View", "Luxury Spa", "Michelin Restaurant"]
  },
  {
    id: "2",
    name: "Modern Boutique Suites",
    starRating: 4,
    location: "Marais District",
    address: "45 Rue des Rosiers, 75004 Paris",
    distanceFromCenter: 1.1,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
    ],
    price: 185,
    guestRating: 8.7,
    reviewCount: 892,
    amenities: ["wifi", "gym", "restaurant", "bar", "pet-friendly"],
    roomTypes: ["Standard Suite", "Premium Suite"],
    cancellationPolicy: "free",
    breakfastIncluded: false,
    instantBooking: true,
    propertyType: "hotel",
    coordinates: { lat: 48.8606, lng: 2.3522 },
    deals: ["Book Direct & Save"],
    lastBooked: "45 minutes ago"
  },
  {
    id: "3",
    name: "Luxury Seine Resort",
    starRating: 5,
    location: "Seine Riverfront",
    address: "78 Quai de la Seine, 75019 Paris",
    distanceFromCenter: 2.8,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop"
    ],
    price: 420,
    originalPrice: 520,
    guestRating: 9.5,
    reviewCount: 567,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "bar", "beach", "yacht", "helipad"],
    roomTypes: ["River View Suite", "Penthouse", "Villa"],
    cancellationPolicy: "partial",
    breakfastIncluded: true,
    instantBooking: false,
    propertyType: "resort",
    coordinates: { lat: 48.8831, lng: 2.3675 },
    deals: ["Luxury Package 25% Off", "Spa Credit Included"],
    popularFeatures: ["Private Beach", "Yacht Access", "Helicopter Tours"]
  },
  {
    id: "4",
    name: "Cozy Montmartre Apartment",
    starRating: 3,
    location: "Montmartre",
    address: "15 Rue Lepic, 75018 Paris",
    distanceFromCenter: 3.2,
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop"
    ],
    price: 95,
    guestRating: 8.1,
    reviewCount: 234,
    amenities: ["wifi", "kitchen", "balcony"],
    roomTypes: ["Studio", "One Bedroom"],
    cancellationPolicy: "free",
    breakfastIncluded: false,
    instantBooking: true,
    propertyType: "apartment",
    coordinates: { lat: 48.8848, lng: 2.3364 },
    lastBooked: "1 day ago"
  },
  {
    id: "5",
    name: "Business Class Hotel",
    starRating: 4,
    location: "La Défense",
    address: "1 Place de la Défense, 92400 Courbevoie",
    distanceFromCenter: 8.5,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop"
    ],
    price: 165,
    guestRating: 8.4,
    reviewCount: 1456,
    amenities: ["wifi", "gym", "restaurant", "business-center", "meeting-rooms", "parking"],
    roomTypes: ["Business Room", "Executive Suite"],
    cancellationPolicy: "free",
    breakfastIncluded: true,
    instantBooking: true,
    propertyType: "hotel",
    coordinates: { lat: 48.8922, lng: 2.2358 },
    deals: ["Business Traveler Special"]
  },
  {
    id: "6",
    name: "Charming Latin Quarter Inn",
    starRating: 3,
    location: "Latin Quarter",
    address: "23 Rue Saint-Jacques, 75005 Paris",
    distanceFromCenter: 1.8,
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"
    ],
    price: 125,
    guestRating: 7.9,
    reviewCount: 678,
    amenities: ["wifi", "restaurant", "library"],
    roomTypes: ["Classic Room", "Superior Room"],
    cancellationPolicy: "partial",
    breakfastIncluded: false,
    instantBooking: true,
    propertyType: "guesthouse",
    coordinates: { lat: 48.8499, lng: 2.3447 },
    lastBooked: "3 hours ago"
  },
  {
    id: "7",
    name: "Luxury Villa Neuilly",
    starRating: 5,
    location: "Neuilly-sur-Seine",
    address: "12 Avenue Charles de Gaulle, 92200 Neuilly-sur-Seine",
    distanceFromCenter: 6.2,
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop"
    ],
    price: 750,
    originalPrice: 950,
    guestRating: 9.7,
    reviewCount: 156,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "bar", "garden", "tennis-court", "helipad"],
    roomTypes: ["Master Suite", "Villa"],
    cancellationPolicy: "non-refundable",
    breakfastIncluded: true,
    instantBooking: false,
    propertyType: "villa",
    coordinates: { lat: 48.8846, lng: 2.2691 },
    deals: ["Exclusive Villa Experience"],
    popularFeatures: ["Private Garden", "Tennis Court", "Butler Service"]
  },
  {
    id: "8",
    name: "Budget Smart Hotel",
    starRating: 2,
    location: "République",
    address: "89 Boulevard du Temple, 75003 Paris",
    distanceFromCenter: 2.1,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop"
    ],
    price: 68,
    guestRating: 7.2,
    reviewCount: 892,
    amenities: ["wifi", "elevator"],
    roomTypes: ["Economy Room", "Standard Room"],
    cancellationPolicy: "free",
    breakfastIncluded: false,
    instantBooking: true,
    propertyType: "hotel",
    coordinates: { lat: 48.8671, lng: 2.3656 },
    deals: ["Best Value Deal"]
  }
];

// Sort options
export const sortOptions: SortOption[] = [
  { value: "relevance", label: "Best Match" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Guest Rating" },
  { value: "distance", label: "Distance from Center" },
  { value: "popularity", label: "Most Popular" },
  { value: "newest", label: "Newest First" }
];

// Neighborhoods data
export const neighborhoods: Neighborhood[] = [
  { id: "city-center", name: "City Center", hotelCount: 145, averagePrice: 285 },
  { id: "champs-elysees", name: "Champs-Élysées", hotelCount: 67, averagePrice: 320 },
  { id: "marais", name: "Marais", hotelCount: 89, averagePrice: 195 },
  { id: "latin-quarter", name: "Latin Quarter", hotelCount: 78, averagePrice: 165 },
  { id: "montmartre", name: "Montmartre", hotelCount: 92, averagePrice: 125 },
  { id: "saint-germain", name: "Saint-Germain", hotelCount: 56, averagePrice: 245 },
  { id: "bastille", name: "Bastille", hotelCount: 43, averagePrice: 155 },
  { id: "republique", name: "République", hotelCount: 38, averagePrice: 135 }
];

// Default filters
export const defaultFilters: SearchFilters = {
  priceRange: [0, 1000],
  starRating: [],
  guestRating: 0,
  propertyTypes: [],
  amenities: [],
  neighborhoods: [],
  cancellationPolicy: [],
  mealPlans: []
};

// Property types
export const propertyTypes = [
  { value: "hotel", label: "Hotels", count: 156 },
  { value: "resort", label: "Resorts", count: 23 },
  { value: "apartment", label: "Apartments", count: 89 },
  { value: "guesthouse", label: "Guesthouses", count: 45 },
  { value: "villa", label: "Villas", count: 12 }
];

// Popular amenities for filtering
export const popularAmenities = [
  { value: "wifi", label: "Free WiFi", count: 298 },
  { value: "pool", label: "Swimming Pool", count: 145 },
  { value: "spa", label: "Spa", count: 87 },
  { value: "gym", label: "Fitness Center", count: 167 },
  { value: "restaurant", label: "Restaurant", count: 201 },
  { value: "bar", label: "Bar", count: 134 },
  { value: "parking", label: "Parking", count: 178 },
  { value: "pet-friendly", label: "Pet Friendly", count: 67 },
  { value: "beach", label: "Beach Access", count: 23 },
  { value: "business-center", label: "Business Center", count: 89 }
];

// Mock search parameters (would come from URL params in real app)
export const mockSearchParams = {
  destination: "Paris, France",
  checkIn: "2025-07-15",
  checkOut: "2025-07-18",
  guests: 2,
  rooms: 1
};

export default {
  searchResults,
  sortOptions,
  neighborhoods,
  defaultFilters,
  propertyTypes,
  popularAmenities,
  mockSearchParams
};