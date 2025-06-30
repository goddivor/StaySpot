import React, { useState } from 'react';
import { 
  Profile,
  Calendar,
  Heart,
  Star1,
  SearchNormal1,
  Add,
  TickCircle,
  Location,
  Clock,
  Setting2,
  Notification,
  Eye,
  Edit,
  Global,
  TrendUp,
  Airplane} from 'iconsax-react';
import Button from '@/components/Button';
import { Logo } from '@/components/ui/logo';

// Domain models - think of these as the core entities in our hotel booking system
interface UpcomingTrip {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  roomType: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  hotelImage: string;
  bookingReference: string;
  isUpcoming: boolean;
}

interface RecentActivity {
  id: string;
  type: 'booking' | 'review' | 'wishlist' | 'modification';
  title: string;
  description: string;
  timestamp: string;
  hotelName?: string;
  icon: React.ReactNode;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

interface TravelRecommendation {
  id: string;
  destination: string;
  reason: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

const Dashboard: React.FC = () => {
  const [user] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    memberSince: '2023',
    totalBookings: 12,
    favoriteDestinations: 5,
    reviewsWritten: 8
  });

  // Mock data - in real app, this would come from API calls
  const [upcomingTrips] = useState<UpcomingTrip[]>([
    {
      id: '1',
      hotelName: 'Grand Palace Resort',
      location: 'Bali, Indonesia',
      checkIn: '2025-07-15',
      checkOut: '2025-07-22',
      nights: 7,
      guests: 2,
      roomType: 'Ocean View Suite',
      totalPrice: 2450,
      status: 'confirmed',
      hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      bookingReference: 'BK2025071501',
      isUpcoming: true
    },
    {
      id: '2',
      hotelName: 'Alpine Mountain Lodge',
      location: 'Swiss Alps, Switzerland',
      checkIn: '2025-08-10',
      checkOut: '2025-08-17',
      nights: 7,
      guests: 4,
      roomType: 'Family Mountain Suite',
      totalPrice: 3200,
      status: 'confirmed',
      hotelImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      bookingReference: 'BK2025081001',
      isUpcoming: true
    }
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New booking confirmed',
      description: 'Grand Palace Resort - Ocean View Suite',
      timestamp: '2 hours ago',
      hotelName: 'Grand Palace Resort',
      icon: <TickCircle color="#10B981" size={20} />
    },
    {
      id: '2',
      type: 'review',
      title: 'Review submitted',
      description: 'Left a 5-star review for Sunset Beach Hotel',
      timestamp: '1 day ago',
      hotelName: 'Sunset Beach Hotel',
      icon: <Star1 color="#F59E0B" size={20} variant="Bold" />
    },
    {
      id: '3',
      type: 'wishlist',
      title: 'Added to favorites',
      description: 'Tokyo Imperial Hotel added to your wishlist',
      timestamp: '3 days ago',
      hotelName: 'Tokyo Imperial Hotel',
      icon: <Heart color="#EF4444" size={20} variant="Bold" />
    },
    {
      id: '4',
      type: 'modification',
      title: 'Booking modified',
      description: 'Check-in date updated for Alpine Mountain Lodge',
      timestamp: '5 days ago',
      hotelName: 'Alpine Mountain Lodge',
      icon: <Edit color="#3B82F6" size={20} />
    }
  ]);

  const [travelRecommendations] = useState<TravelRecommendation[]>([
    {
      id: '1',
      destination: 'Paris, France',
      reason: 'Based on your European trip history',
      price: 180,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 1250
    },
    {
      id: '2',
      destination: 'Kyoto, Japan',
      reason: 'Popular among travelers like you',
      price: 220,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 890
    },
    {
      id: '3',
      destination: 'Santorini, Greece',
      reason: 'Similar to your previous beach stays',
      price: 350,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 2100
    }
  ]);

  // Quick actions - like a hotel concierge service menu
  const quickActions: QuickAction[] = [
    {
      id: 'search',
      title: 'Book New Stay',
      description: 'Find your next perfect hotel',
      icon: <SearchNormal1 color="#ffffff" size={24} className="text-white" />,
      action: () => window.location.href = '/',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      description: 'View and manage reservations',
      icon: <Calendar color="#ffffff" size={24} className="text-white" />,
      action: () => window.location.href = '/my-bookings',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'favorites',
      title: 'Favorites',
      description: 'Your saved hotels and destinations',
      icon: <Heart color="#ffffff" size={24} className="text-white" />,
      action: () => window.location.href = '/favorites',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Update your preferences',
      icon: <Setting2 color="#ffffff" size={24} className="text-white" />,
      action: () => window.location.href = '/profile',
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span 
                className="text-xl font-bold text-gray-900 cursor-pointer" 
                onClick={handleGoHome}
              >
                StaySpot
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Notification color="#6B7280" size={24} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Profile color="#ffffff" size={20} className="text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Member since {user.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Here's an overview of your travel activity and upcoming adventures.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar color="#3B82F6" size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.totalBookings}</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart color="#EF4444" size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.favoriteDestinations}</p>
                <p className="text-sm text-gray-600">Favorite Places</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star1 color="#F59E0B" size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.reviewsWritten}</p>
                <p className="text-sm text-gray-600">Reviews Written</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendUp color="#10B981" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Trips & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upcoming Trips */}
            <section className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Airplane color="#3B82F6" size={24} className="text-blue-600" />
                    Upcoming Trips
                  </h2>
                  <Button
                    onClick={() => window.location.href = '/my-bookings'}
                    className="text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-50 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    View All
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                {upcomingTrips.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTrips.slice(0, 2).map((trip) => (
                      <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex gap-4">
                          <img
                            src={trip.hotelImage}
                            alt={trip.hotelName}
                            className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">{trip.hotelName}</h3>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Location color="#6B7280" size={14} className="text-gray-400" />
                                  {trip.location}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(trip.status)}`}>
                                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar color="#6B7280" size={14} className="text-gray-400" />
                                <span>{formatDate(trip.checkIn)} - {formatDate(trip.checkOut)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock color="#6B7280" size={14} className="text-gray-400" />
                                <span>{trip.nights} nights, {trip.guests} guests</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">{trip.roomType}</p>
                                <p className="font-semibold text-gray-900">${trip.totalPrice.toLocaleString()}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button className="text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm transition-colors">
                                  <Eye color="#6B7280" size={14} className="text-gray-600" />
                                  View
                                </Button>
                                <Button className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-sm transition-colors">
                                  <Edit color="#3B82F6" size={14} className="text-blue-600" />
                                  Manage
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Airplane color="#6B7280" size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming trips</h3>
                    <p className="text-gray-600 mb-4">Start planning your next adventure!</p>
                    <Button
                      onClick={() => window.location.href = '/'}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Find Hotels
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Add color="#3B82F6" size={24} className="text-blue-600" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className={`${action.color} text-white p-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-opacity-20 rounded-lg flex items-center justify-center">
                          {action.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">{action.title}</h3>
                          <p className="text-sm opacity-90">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Recent Activity & Recommendations */}
          <div className="space-y-8">
            
            {/* Recent Activity */}
            <section className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock color="#3B82F6" size={24} className="text-blue-600" />
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => window.location.href = '/my-bookings'}
                  className="w-full mt-4 text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-50 py-2 rounded-lg text-sm transition-colors"
                >
                  View Full History
                </Button>
              </div>
            </section>

            {/* Travel Recommendations */}
            <section className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Global color="#3B82F6" size={24} className="text-blue-600" />
                  Recommended for You
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {travelRecommendations.map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
                      <img
                        src={recommendation.image}
                        alt={recommendation.destination}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{recommendation.destination}</h3>
                            <p className="text-xs text-gray-600">{recommendation.reason}</p>
                          </div>
                          {recommendation.discount && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                              -{recommendation.discount}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star1 color="#F59E0B" size={14} variant="Bold" className="text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {recommendation.rating} ({recommendation.reviewCount})
                            </span>
                          </div>
                          <div className="text-right">
                            {recommendation.discount && (
                              <p className="text-xs text-gray-500 line-through">
                                ${Math.round(recommendation.price / (1 - recommendation.discount / 100))}
                              </p>
                            )}
                            <p className="font-semibold text-gray-900">
                              From ${recommendation.price}/night
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Explore More Destinations
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;