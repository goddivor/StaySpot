// src/mocks/landingData.ts

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  startingPrice: number;
  hotelCount: number;
  popularAttractions: string;
}

export interface FeaturedHotel {
  id: string;
  name: string;
  starRating: number;
  location: string;
  distanceFromCenter: number;
  image: string;
  startingPrice: number;
  guestRating: number;
  reviewCount: number;
  amenities: string[];
}

export interface GuestReview {
  id: string;
  guestName: string;
  guestLocation: string;
  guestImage: string;
  rating: number;
  reviewText: string;
  hotelName: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  location: string;
}

// Mock data for hero carousel
export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    title: "Luxury Redefined",
    subtitle: "Experience world-class hospitality",
    location: "Maldives"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    title: "Urban Sophistication",
    subtitle: "Premium hotels in vibrant cities",
    location: "New York"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    title: "Tropical Paradise",
    subtitle: "Escape to pristine beaches",
    location: "Bali"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    title: "Mountain Retreats",
    subtitle: "Serenity in nature's embrace",
    location: "Swiss Alps"
  }
];

// Mock data for popular destinations
export const popularDestinations: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    startingPrice: 120,
    hotelCount: 1247,
    popularAttractions: "Eiffel Tower, Louvre Museum"
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    startingPrice: 95,
    hotelCount: 892,
    popularAttractions: "Shibuya, Tokyo Tower"
  },
  {
    id: "3",
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    startingPrice: 180,
    hotelCount: 1156,
    popularAttractions: "Times Square, Central Park"
  },
  {
    id: "4",
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    startingPrice: 200,
    hotelCount: 445,
    popularAttractions: "Burj Khalifa, Dubai Mall"
  },
  {
    id: "5",
    name: "London",
    country: "UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    startingPrice: 150,
    hotelCount: 987,
    popularAttractions: "Big Ben, London Eye"
  },
  {
    id: "6",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    startingPrice: 85,
    hotelCount: 623,
    popularAttractions: "Uluwatu Temple, Rice Terraces"
  },
  {
    id: "7",
    name: "Rome",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    startingPrice: 110,
    hotelCount: 756,
    popularAttractions: "Colosseum, Vatican City"
  },
  {
    id: "8",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    startingPrice: 160,
    hotelCount: 234,
    popularAttractions: "Oia Sunset, Blue Domes"
  }
];

// Mock data for featured hotels
export const featuredHotels: FeaturedHotel[] = [
  {
    id: "1",
    name: "The Grand Palais",
    starRating: 5,
    location: "Paris, France",
    distanceFromCenter: 0.8,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
    startingPrice: 245,
    guestRating: 9.2,
    reviewCount: 1834,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant"]
  },
  {
    id: "2",
    name: "Sakura Heights",
    starRating: 4,
    location: "Tokyo, Japan",
    distanceFromCenter: 1.2,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    startingPrice: 180,
    guestRating: 8.9,
    reviewCount: 967,
    amenities: ["wifi", "restaurant", "bar", "concierge"]
  },
  {
    id: "3",
    name: "Manhattan Elite",
    starRating: 5,
    location: "New York, USA",
    distanceFromCenter: 0.5,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    startingPrice: 320,
    guestRating: 9.1,
    reviewCount: 2156,
    amenities: ["wifi", "gym", "spa", "restaurant", "bar", "room-service"]
  },
  {
    id: "4",
    name: "Desert Oasis Resort",
    starRating: 5,
    location: "Dubai, UAE",
    distanceFromCenter: 2.1,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    startingPrice: 280,
    guestRating: 9.4,
    reviewCount: 1453,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "beach"]
  },
  {
    id: "5",
    name: "Thames View Hotel",
    starRating: 4,
    location: "London, UK",
    distanceFromCenter: 0.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    startingPrice: 195,
    guestRating: 8.7,
    reviewCount: 1287,
    amenities: ["wifi", "restaurant", "bar", "concierge", "parking"]
  },
  {
    id: "6",
    name: "Villa Serenity",
    starRating: 4,
    location: "Bali, Indonesia",
    distanceFromCenter: 3.5,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    startingPrice: 125,
    guestRating: 9.0,
    reviewCount: 843,
    amenities: ["wifi", "pool", "spa", "restaurant", "beach", "yoga"]
  }
];

// Mock data for guest reviews
export const guestReviews: GuestReview[] = [
  {
    id: "1",
    guestName: "Sarah Johnson",
    guestLocation: "California, USA",
    guestImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    reviewText: "Absolutely incredible experience! The staff went above and beyond to make our honeymoon perfect. The room was stunning with breathtaking views.",
    hotelName: "The Grand Palais"
  },
  {
    id: "2",
    guestName: "Michael Chen",
    guestLocation: "Singapore",
    guestImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    reviewText: "Perfect location in the heart of the city. Modern amenities, exceptional service, and the breakfast was amazing. Will definitely return!",
    hotelName: "Sakura Heights"
  },
  {
    id: "3",
    guestName: "Emma Thompson",
    guestLocation: "London, UK",
    guestImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    reviewText: "Luxury at its finest! From the moment we arrived, every detail was perfect. The spa treatments were incredible and the concierge was so helpful.",
    hotelName: "Manhattan Elite"
  },
  {
    id: "4",
    guestName: "James Wilson",
    guestLocation: "Sydney, Australia",
    guestImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    reviewText: "Exceeded all expectations! The desert views were spectacular, and the infinity pool was like something from a dream. Highly recommended!",
    hotelName: "Desert Oasis Resort"
  },
  {
    id: "5",
    guestName: "Lisa Rodriguez",
    guestLocation: "Madrid, Spain",
    guestImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    reviewText: "Charming hotel with incredible character. The afternoon tea was delightful and the Thames views from our room were absolutely gorgeous.",
    hotelName: "Thames View Hotel"
  }
];

// Mock data for trust indicators
export const trustIndicators = [
  {
    icon: "shield-check",
    title: "Free Cancellation",
    description: "Cancel up to 24 hours before check-in"
  },
  {
    icon: "money-back",
    title: "Best Price Guarantee",
    description: "We'll match any lower price you find"
  },
  {
    icon: "24-7",
    title: "24/7 Support",
    description: "Round-the-clock customer assistance"
  }
];

// Mock data for features section
export const whyChooseUsFeatures = [
  {
    icon: "price-tag",
    title: "Best Prices",
    description: "Price comparison guarantee with money-back promise. We constantly monitor competitor prices to ensure you get the best deal.",
    highlight: "Save up to 40%"
  },
  {
    icon: "mouse-click",
    title: "Easy Booking",
    description: "One-click booking process with instant confirmation. No hidden fees, no surprises - just transparent, simple booking.",
    highlight: "Book in 60 seconds"
  },
  {
    icon: "headset",
    title: "24/7 Support",
    description: "Round-the-clock customer service with multiple contact options. Our expert team is always ready to help with any questions.",
    highlight: "Always available"
  }
];

export default {
  heroSlides,
  popularDestinations,
  featuredHotels,
  guestReviews,
  trustIndicators,
  whyChooseUsFeatures
};