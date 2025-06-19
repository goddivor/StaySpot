// src/mocks/hotelDetailsData.ts

export interface RoomType {
  id: string;
  name: string;
  description: string;
  size: number; // in sqm
  bedConfiguration: string;
  maxOccupancy: number;
  images: string[];
  amenities: string[];
  basePrice: number;
  discountedPrice?: number;
  available: boolean;
  availableRooms: number;
  cancellationPolicy: 'free' | 'partial' | 'non-refundable';
  specialOffers?: string[];
  roomFeatures: string[];
}

export interface HotelPolicies {
  checkIn: string;
  checkOut: string;
  cancellation: {
    title: string;
    description: string;
    cutoffTime: string;
  };
  children: {
    allowed: boolean;
    ageLimit?: number;
    extraBedFee?: number;
  };
  pets: {
    allowed: boolean;
    fee?: number;
    restrictions?: string;
  };
  payment: {
    accepted: string[];
    deposit?: string;
    taxesIncluded: boolean;
  };
  smoking: boolean;
  parties: boolean;
  covidMeasures: string[];
}

export interface NearbyAttraction {
  id: string;
  name: string;
  type: 'museum' | 'restaurant' | 'landmark' | 'shopping' | 'transport' | 'entertainment';
  distance: number; // in km
  walkingTime?: number; // in minutes
  rating?: number;
  description: string;
  image?: string;
}

export interface HotelReview {
  id: string;
  guestName: string;
  guestCountry: string;
  guestImage: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  roomType: string;
  stayDuration: string;
  travelType: 'business' | 'leisure' | 'family' | 'couple' | 'solo';
  liked: string[];
  disliked?: string[];
  helpful: number;
  verified: boolean;
  categoryRatings: {
    cleanliness: number;
    comfort: number;
    location: number;
    service: number;
    valueForMoney: number;
    facilities: number;
  };
}

export interface DetailedHotel {
  id: string;
  name: string;
  starRating: number;
  location: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distanceFromCenter: number;
  description: string;
  checkInDate?: string;
  checkOutDate?: string;
  
  // Media
  images: string[];
  virtualTour?: string;
  
  // Ratings and Reviews
  guestRating: number;
  reviewCount: number;
  reviewsBreakdown: {
    excellent: number;
    veryGood: number;
    good: number;
    fair: number;
    poor: number;
  };
  categoryRatings: {
    cleanliness: number;
    comfort: number;
    location: number;
    service: number;
    valueForMoney: number;
    facilities: number;
  };
  
  // Amenities and Features
  amenities: string[];
  popularAmenities: string[];
  businessAmenities: string[];
  recreationAmenities: string[];
  accessibilityFeatures: string[];
  
  // Property Details
  propertyType: 'hotel' | 'resort' | 'apartment' | 'guesthouse' | 'villa';
  established: string;
  totalRooms: number;
  floors: number;
  languages: string[];
  
  // Dining and Services
  restaurants: {
    name: string;
    cuisine: string;
    description: string;
    hours: string;
    priceRange: string;
  }[];
  
  // Room Types
  roomTypes: RoomType[];
  
  // Policies
  policies: HotelPolicies;
  
  // Location Info
  nearbyAttractions: NearbyAttraction[];
  
  // Reviews
  reviews: HotelReview[];
  
  // Special Features
  awards: string[];
  certifications: string[];
  sustainabilityFeatures: string[];
  
  // Booking Info
  instantBooking: boolean;
  freeBreakfast: boolean;
  freeCancellation: boolean;
  bestPriceGuarantee: boolean;
  
  // Weather
  currentWeather?: {
    temperature: number;
    condition: string;
    icon: string;
  };
}

// Mock hotel details data
export const mockHotelDetails: DetailedHotel = {
  id: "1",
  name: "The Grand Palace Hotel",
  starRating: 5,
  location: "Paris City Center",
  address: "123 Champs-Élysées, 75008 Paris, France",
  coordinates: { lat: 48.8566, lng: 2.3522 },
  distanceFromCenter: 0.2,
  description: "Experience the epitome of Parisian luxury at The Grand Palace Hotel, where timeless elegance meets modern sophistication. Located in the heart of the Champs-Élysées, our hotel offers breathtaking views of the Arc de Triomphe and unparalleled access to the city's most prestigious shopping and cultural attractions. Each meticulously designed room and suite combines classic French décor with contemporary amenities, ensuring an unforgettable stay in the City of Light.",
  
  images: [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop"
  ],
  virtualTour: "https://example.com/virtual-tour",
  
  guestRating: 9.2,
  reviewCount: 1834,
  reviewsBreakdown: {
    excellent: 1425,
    veryGood: 298,
    good: 87,
    fair: 18,
    poor: 6
  },
  categoryRatings: {
    cleanliness: 9.4,
    comfort: 9.1,
    location: 9.7,
    service: 9.3,
    valueForMoney: 8.8,
    facilities: 9.0
  },
  
  amenities: [
    "wifi", "pool", "spa", "gym", "restaurant", "bar", "room-service", "concierge",
    "parking", "business-center", "meeting-rooms", "laundry", "safe", "minibar",
    "air-conditioning", "elevator", "24-hour-front-desk", "luggage-storage"
  ],
  popularAmenities: ["wifi", "pool", "spa", "gym", "restaurant", "bar"],
  businessAmenities: ["business-center", "meeting-rooms", "wifi", "concierge"],
  recreationAmenities: ["pool", "spa", "gym", "bar"],
  accessibilityFeatures: ["wheelchair-accessible", "elevator", "accessible-bathroom"],
  
  propertyType: "hotel",
  established: "1925",
  totalRooms: 185,
  floors: 8,
  languages: ["French", "English", "German", "Spanish", "Italian"],
  
  restaurants: [
    {
      name: "Le Jardin Royal",
      cuisine: "French Fine Dining",
      description: "Michelin-starred restaurant featuring contemporary French cuisine with seasonal ingredients.",
      hours: "7:00 PM - 11:00 PM",
      priceRange: "$$$"
    },
    {
      name: "Café Parisien",
      cuisine: "French Bistro",
      description: "Casual dining with classic French bistro fare and an extensive wine selection.",
      hours: "6:00 AM - 12:00 AM",
      priceRange: "$$"
    }
  ],
  
  roomTypes: [
    {
      id: "deluxe-room",
      name: "Deluxe Room",
      description: "Elegantly appointed room with city views and classic Parisian décor.",
      size: 35,
      bedConfiguration: "1 King Bed or 2 Twin Beds",
      maxOccupancy: 2,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop"
      ],
      amenities: ["wifi", "air-conditioning", "minibar", "safe", "room-service"],
      basePrice: 295,
      discountedPrice: 245,
      available: true,
      availableRooms: 8,
      cancellationPolicy: "free",
      specialOffers: ["Early Bird 20% Off", "Free Breakfast"],
      roomFeatures: ["City View", "Marble Bathroom", "Work Desk", "Sitting Area"]
    },
    {
      id: "executive-suite",
      name: "Executive Suite",
      description: "Spacious suite with separate living area and panoramic city views.",
      size: 65,
      bedConfiguration: "1 King Bed",
      maxOccupancy: 4,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop"
      ],
      amenities: ["wifi", "air-conditioning", "minibar", "safe", "room-service", "balcony"],
      basePrice: 495,
      available: true,
      availableRooms: 3,
      cancellationPolicy: "free",
      roomFeatures: ["Panoramic View", "Separate Living Room", "Premium Bathroom", "Balcony"]
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      description: "Our most luxurious accommodation with Arc de Triomphe views and butler service.",
      size: 120,
      bedConfiguration: "1 King Bed + Sofa Bed",
      maxOccupancy: 6,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop"
      ],
      amenities: ["wifi", "air-conditioning", "minibar", "safe", "room-service", "balcony", "butler-service"],
      basePrice: 1250,
      available: true,
      availableRooms: 1,
      cancellationPolicy: "partial",
      roomFeatures: ["Arc de Triomphe View", "Butler Service", "Dining Room", "Premium Amenities"]
    }
  ],
  
  policies: {
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    cancellation: {
      title: "Free Cancellation",
      description: "Cancel up to 24 hours before check-in for a full refund",
      cutoffTime: "24 hours"
    },
    children: {
      allowed: true,
      ageLimit: 12,
      extraBedFee: 35
    },
    pets: {
      allowed: true,
      fee: 25,
      restrictions: "Dogs and cats only, maximum 2 pets"
    },
    payment: {
      accepted: ["Visa", "Mastercard", "American Express", "PayPal"],
      deposit: "One night's stay",
      taxesIncluded: false
    },
    smoking: false,
    parties: false,
    covidMeasures: [
      "Enhanced cleaning protocols",
      "Contactless check-in available",
      "Face masks required in public areas",
      "Social distancing measures"
    ]
  },
  
  nearbyAttractions: [
    {
      id: "arc-de-triomphe",
      name: "Arc de Triomphe",
      type: "landmark",
      distance: 0.1,
      walkingTime: 2,
      rating: 4.5,
      description: "Iconic triumphal arch at the center of Place Charles de Gaulle"
    },
    {
      id: "louvre-museum",
      name: "Louvre Museum",
      type: "museum",
      distance: 1.8,
      walkingTime: 22,
      rating: 4.6,
      description: "World's largest art museum and historic monument"
    },
    {
      id: "champs-elysees-shopping",
      name: "Champs-Élysées Shopping",
      type: "shopping",
      distance: 0.0,
      walkingTime: 1,
      rating: 4.3,
      description: "Famous avenue with luxury shops and boutiques"
    },
    {
      id: "eiffel-tower",
      name: "Eiffel Tower",
      type: "landmark",
      distance: 2.5,
      walkingTime: 30,
      rating: 4.4,
      description: "Iconic iron lattice tower and symbol of Paris"
    }
  ],
  
  reviews: [
    {
      id: "review-1",
      guestName: "Sarah Johnson",
      guestCountry: "United States",
      guestImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "2025-06-15",
      title: "Absolutely Perfect Stay!",
      content: "The Grand Palace exceeded all our expectations. The location is unbeatable - right on the Champs-Élysées with stunning views. The staff was incredibly attentive, and our room was spacious and beautifully decorated. The breakfast was exceptional, and the spa treatments were divine. We'll definitely be back!",
      roomType: "Executive Suite",
      stayDuration: "4 nights",
      travelType: "couple",
      liked: ["Location", "Service", "Room quality", "Breakfast"],
      helpful: 24,
      verified: true,
      categoryRatings: {
        cleanliness: 5,
        comfort: 5,
        location: 5,
        service: 5,
        valueForMoney: 4,
        facilities: 5
      }
    },
    {
      id: "review-2",
      guestName: "Michael Chen",
      guestCountry: "Singapore",
      guestImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      rating: 4,
      date: "2025-06-10",
      title: "Great Business Hotel",
      content: "Perfect for business travel. The location is ideal for meetings in the area, and the business center facilities are top-notch. Room was comfortable and quiet despite being in the city center. Only minor complaint is that the WiFi could be faster in the rooms.",
      roomType: "Deluxe Room",
      stayDuration: "2 nights",
      travelType: "business",
      liked: ["Location", "Business facilities", "Quiet rooms"],
      disliked: ["WiFi speed"],
      helpful: 18,
      verified: true,
      categoryRatings: {
        cleanliness: 4,
        comfort: 4,
        location: 5,
        service: 4,
        valueForMoney: 4,
        facilities: 4
      }
    },
    {
      id: "review-3",
      guestName: "Emma Thompson",
      guestCountry: "United Kingdom",
      guestImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "2025-06-05",
      title: "Luxury at its Finest",
      content: "This hotel is pure luxury! From the moment we walked in, we were treated like royalty. The concierge helped us get reservations at amazing restaurants, and the spa was incredible. The room was beautifully appointed with every amenity you could want. Worth every penny!",
      roomType: "Presidential Suite",
      stayDuration: "3 nights",
      travelType: "leisure",
      liked: ["Luxury amenities", "Concierge service", "Spa", "Room design"],
      helpful: 31,
      verified: true,
      categoryRatings: {
        cleanliness: 5,
        comfort: 5,
        location: 5,
        service: 5,
        valueForMoney: 4,
        facilities: 5
      }
    }
  ],
  
  awards: ["World's Best Hotel 2024", "Luxury Hotel of the Year", "Excellence in Service Award"],
  certifications: ["Green Key Certification", "ISO 14001", "LEED Gold"],
  sustainabilityFeatures: ["Solar panels", "Energy-efficient lighting", "Water conservation", "Local sourcing"],
  
  instantBooking: true,
  freeBreakfast: true,
  freeCancellation: true,
  bestPriceGuarantee: true,
  
  currentWeather: {
    temperature: 22,
    condition: "Partly Cloudy",
    icon: "partly-cloudy"
  }
};

export default mockHotelDetails;