/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Calendar,
  Location,
  Profile2User,
  Clock,
  Eye,
  Edit,
  Trash,
  Call,
  MessageText,
  DocumentDownload,
  Star1,
  TickCircle,
  InfoCircle,
  CloseCircle,
  SearchNormal1,
  Filter,
  ArrowLeft,
  Notification,
  Profile,
  Airplane,
  Building,
  Timer1,
  MoneyRecive,
//   Bed,
  Camera
} from 'iconsax-react';
import Button from '@/components/Button';
import { Logo } from '@/components/ui/logo';
import { useToast } from '@/context/toast-context';
import { Bed } from '@phosphor-icons/react';

// Domain models - think of these as the guest ledger system at a hotel
interface Booking {
  id: string;
  bookingReference: string;
  hotelName: string;
  hotelLocation: string;
  hotelImage: string;
  hotelRating: number;
  roomType: string;
  roomImages: string[];
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  rooms: number;
  totalPrice: number;
  originalPrice?: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'checked-in' | 'no-show';
  bookingDate: string;
  cancellationPolicy: 'free' | 'partial' | 'non-refundable';
  canModify: boolean;
  canCancel: boolean;
  canCheckIn: boolean;
  canReview: boolean;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  guestDetails: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
  confirmationSent: boolean;
  hotelContact: {
    phone: string;
    email: string;
  };
}

interface FilterOptions {
  status: string;
  dateRange: string;
  priceRange: string;
  sortBy: string;
}

const BookingHistory: React.FC = () => {
  const { success, error, info } = useToast();
  
  // State management - like managing a guest registry
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    dateRange: 'all',
    priceRange: 'all',
    sortBy: 'date-desc'
  });

  // Mock booking data - in real app, this would come from API
  const [bookings] = useState<Booking[]>([
    {
      id: 'book_001',
      bookingReference: 'BK2025071501',
      hotelName: 'Grand Palace Resort',
      hotelLocation: 'Bali, Indonesia',
      hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      hotelRating: 4.8,
      roomType: 'Ocean View Suite',
      roomImages: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
      ],
      checkIn: '2025-07-15',
      checkOut: '2025-07-22',
      nights: 7,
      guests: 2,
      rooms: 1,
      totalPrice: 2450,
      originalPrice: 2800,
      status: 'upcoming',
      bookingDate: '2025-06-20',
      cancellationPolicy: 'free',
      canModify: true,
      canCancel: true,
      canCheckIn: false,
      canReview: false,
      paymentStatus: 'paid',
      guestDetails: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567'
      },
      specialRequests: 'High floor, ocean view, late check-out if possible',
      confirmationSent: true,
      hotelContact: {
        phone: '+62 361 123456',
        email: 'reservations@grandpalace.com'
      }
    },
    {
      id: 'book_002',
      bookingReference: 'BK2025081001',
      hotelName: 'Alpine Mountain Lodge',
      hotelLocation: 'Swiss Alps, Switzerland',
      hotelImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      hotelRating: 4.9,
      roomType: 'Family Mountain Suite',
      roomImages: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop'
      ],
      checkIn: '2025-08-10',
      checkOut: '2025-08-17',
      nights: 7,
      guests: 4,
      rooms: 1,
      totalPrice: 3200,
      status: 'upcoming',
      bookingDate: '2025-06-25',
      cancellationPolicy: 'partial',
      canModify: true,
      canCancel: true,
      canCheckIn: false,
      canReview: false,
      paymentStatus: 'paid',
      guestDetails: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567'
      },
      confirmationSent: true,
      hotelContact: {
        phone: '+41 27 123456',
        email: 'info@alpinelodge.ch'
      }
    },
    {
      id: 'book_003',
      bookingReference: 'BK2025052001',
      hotelName: 'Sunset Beach Hotel',
      hotelLocation: 'Maldives',
      hotelImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      hotelRating: 4.7,
      roomType: 'Water Villa',
      roomImages: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop'
      ],
      checkIn: '2025-05-20',
      checkOut: '2025-05-27',
      nights: 7,
      guests: 2,
      rooms: 1,
      totalPrice: 4200,
      status: 'completed',
      bookingDate: '2025-04-15',
      cancellationPolicy: 'non-refundable',
      canModify: false,
      canCancel: false,
      canCheckIn: false,
      canReview: true,
      paymentStatus: 'paid',
      guestDetails: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567'
      },
      confirmationSent: true,
      hotelContact: {
        phone: '+960 123456',
        email: 'info@sunsetbeach.mv'
      }
    },
    {
      id: 'book_004',
      bookingReference: 'BK2025040801',
      hotelName: 'City Center Hotel',
      hotelLocation: 'Tokyo, Japan',
      hotelImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
      hotelRating: 4.5,
      roomType: 'Deluxe Room',
      roomImages: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop'
      ],
      checkIn: '2025-04-08',
      checkOut: '2025-04-12',
      nights: 4,
      guests: 1,
      rooms: 1,
      totalPrice: 800,
      status: 'completed',
      bookingDate: '2025-03-20',
      cancellationPolicy: 'free',
      canModify: false,
      canCancel: false,
      canCheckIn: false,
      canReview: true,
      paymentStatus: 'paid',
      guestDetails: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567'
      },
      confirmationSent: true,
      hotelContact: {
        phone: '+81 3 123456',
        email: 'reservations@citycentertokyo.com'
      }
    },
    {
      id: 'book_005',
      bookingReference: 'BK2025030501',
      hotelName: 'Mountain View Resort',
      hotelLocation: 'Aspen, Colorado',
      hotelImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
      hotelRating: 4.6,
      roomType: 'Standard Room',
      roomImages: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop'
      ],
      checkIn: '2025-03-05',
      checkOut: '2025-03-08',
      nights: 3,
      guests: 2,
      rooms: 1,
      totalPrice: 450,
      status: 'cancelled',
      bookingDate: '2025-02-10',
      cancellationPolicy: 'free',
      canModify: false,
      canCancel: false,
      canCheckIn: false,
      canReview: false,
      paymentStatus: 'refunded',
      guestDetails: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567'
      },
      confirmationSent: true,
      hotelContact: {
        phone: '+1 970 123456',
        email: 'info@mountainviewaspen.com'
      }
    }
  ]);

  // Helper functions
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatLongDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { color: 'bg-blue-100 text-blue-800', icon: <Calendar color="#1E40AF" size={14} /> };
      case 'completed':
        return { color: 'bg-green-100 text-green-800', icon: <TickCircle color="#15803D" size={14} /> };
      case 'cancelled':
        return { color: 'bg-red-100 text-red-800', icon: <CloseCircle color="#DC2626" size={14} /> };
      case 'checked-in':
        return { color: 'bg-purple-100 text-purple-800', icon: <Building color="#7C3AED" size={14} /> };
      case 'no-show':
        return { color: 'bg-gray-100 text-gray-800', icon: <InfoCircle color="#6B7280" size={14} /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <InfoCircle color="#6B7280" size={14} /> };
    }
  };

  const getCancellationPolicyBadge = (policy: string) => {
    switch (policy) {
      case 'free':
        return { color: 'text-green-600', text: 'Free Cancellation' };
      case 'partial':
        return { color: 'text-yellow-600', text: 'Partial Refund' };
      case 'non-refundable':
        return { color: 'text-red-600', text: 'Non-refundable' };
      default:
        return { color: 'text-gray-600', text: 'See Policy' };
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return { color: 'text-green-600', text: 'Paid', icon: <TickCircle color="#15803D" size={14} /> };
      case 'pending':
        return { color: 'text-yellow-600', text: 'Pending', icon: <Timer1 color="#D97706" size={14} /> };
      case 'failed':
        return { color: 'text-red-600', text: 'Failed', icon: <CloseCircle color="#DC2626" size={14} /> };
      case 'refunded':
        return { color: 'text-blue-600', text: 'Refunded', icon: <MoneyRecive color="#2563EB" size={14} /> };
      default:
        return { color: 'text-gray-600', text: 'Unknown', icon: <InfoCircle color="#6B7280" size={14} /> };
    }
  };

  // Filter and search functions
  const filteredBookings = bookings.filter(booking => {
    // Tab filter
    const isUpcoming = booking.status === 'upcoming' || booking.status === 'checked-in';
    const isPast = booking.status === 'completed' || booking.status === 'cancelled' || booking.status === 'no-show';
    
    if (activeTab === 'upcoming' && !isUpcoming) return false;
    if (activeTab === 'past' && !isPast) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        booking.hotelName.toLowerCase().includes(query) ||
        booking.hotelLocation.toLowerCase().includes(query) ||
        booking.bookingReference.toLowerCase().includes(query) ||
        booking.roomType.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Action handlers
  const handleViewBooking = (bookingId: string) => {
    setSelectedBooking(selectedBooking === bookingId ? null : bookingId);
  };

  const handleModifyBooking = async (booking: Booking) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      info('Modification', `Redirecting to modify booking ${booking.bookingReference}...`);
      // In real app: window.location.href = `/booking/modify/${booking.id}`;
    } catch (err) {
      error('Error', 'Failed to load modification page');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (booking: Booking) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your booking at ${booking.hotelName}? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      success('Booking Cancelled', `Your booking ${booking.bookingReference} has been cancelled successfully`);
    } catch (err) {
      error('Cancellation Failed', 'Failed to cancel booking. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactHotel = (booking: Booking) => {
    const message = `Hello, I have a booking (${booking.bookingReference}) at your hotel and would like to get in touch.`;
    window.open(`mailto:${booking.hotelContact.email}?subject=Booking Inquiry - ${booking.bookingReference}&body=${encodeURIComponent(message)}`);
  };

  const handleDownloadConfirmation = async (booking: Booking) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Download Started', `Confirmation for ${booking.bookingReference} is being downloaded`);
    } catch (err) {
      error('Download Failed', 'Failed to download confirmation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveReview = (booking: Booking) => {
    window.location.href = `/my-reviews?hotel=${booking.id}`;
  };

  const handleBookAgain = (booking: Booking) => {
    window.location.href = `/hotel/${booking.id}`;
  };

  // Get booking count for each tab
  const upcomingCount = bookings.filter(b => b.status === 'upcoming' || b.status === 'checked-in').length;
  const pastCount = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled' || b.status === 'no-show').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleGoToDashboard}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft color="#6B7280" size={24} />
              </button>
              <div className="flex items-center gap-3">
                <Logo size={40} />
                <span 
                  className="text-xl font-bold text-gray-900 cursor-pointer" 
                  onClick={handleGoHome}
                >
                  StaySpot
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Notification color="#6B7280" size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Profile color="#ffffff" size={20} />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Gold Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your reservations and view booking history</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <SearchNormal1 color="#6B7280" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by hotel name, location, or booking reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Filter color="#374151" size={20} />
              Filters
            </Button>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Highest Price</option>
              <option value="price-asc">Lowest Price</option>
              <option value="name-asc">Hotel Name A-Z</option>
            </select>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="this-year">This Year</option>
                  <option value="last-year">Last Year</option>
                  <option value="last-6-months">Last 6 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="over-2500">Over $2,500</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Airplane color={activeTab === 'upcoming' ? '#2563EB' : '#6B7280'} size={20} />
                Upcoming ({upcomingCount})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock color={activeTab === 'past' ? '#2563EB' : '#6B7280'} size={20} />
                Past Bookings ({pastCount})
              </button>
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const statusBadge = getStatusBadge(booking.status);
              const cancellationPolicy = getCancellationPolicyBadge(booking.cancellationPolicy);
              const paymentStatus = getPaymentStatusBadge(booking.paymentStatus);
              const isExpanded = selectedBooking === booking.id;

              return (
                <div key={booking.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Hotel Image */}
                      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={booking.hotelImage}
                          alt={booking.hotelName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.hotelName}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Location color="#6B7280" size={16} />
                              <span className="text-gray-600">{booking.hotelLocation}</span>
                              <div className="flex items-center gap-1">
                                <Star1 color="#F59E0B" size={16} variant="Bold" />
                                <span className="text-sm text-gray-600">{booking.hotelRating}</span>
                              </div>
                            </div>
                            <p className="text-gray-600">{booking.roomType}</p>
                          </div>

                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color} mb-2`}>
                              {statusBadge.icon}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <p className="text-sm text-gray-600">#{booking.bookingReference}</p>
                          </div>
                        </div>

                        {/* Booking Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar color="#6B7280" size={16} />
                            <div>
                              <p className="text-xs text-gray-500">Check-in</p>
                              <p className="text-sm font-medium text-gray-900">{formatDate(booking.checkIn)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar color="#6B7280" size={16} />
                            <div>
                              <p className="text-xs text-gray-500">Check-out</p>
                              <p className="text-sm font-medium text-gray-900">{formatDate(booking.checkOut)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Profile2User color="#6B7280" size={16} />
                            <div>
                              <p className="text-xs text-gray-500">Guests</p>
                              <p className="text-sm font-medium text-gray-900">{booking.guests} guests, {booking.nights} nights</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <MoneyRecive color="#6B7280" size={16} />
                            <div>
                              <p className="text-xs text-gray-500">Total Price</p>
                              <div className="flex items-center gap-2">
                                {booking.originalPrice && (
                                  <span className="text-xs text-gray-500 line-through">${booking.originalPrice}</span>
                                )}
                                <p className="text-sm font-bold text-gray-900">${booking.totalPrice.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Policy and Payment Info */}
                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <span className={`${cancellationPolicy.color} font-medium`}>
                            {cancellationPolicy.text}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className={`flex items-center gap-1 ${paymentStatus.color} font-medium`}>
                            {paymentStatus.icon}
                            {paymentStatus.text}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={() => handleViewBooking(booking.id)}
                            className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <Eye color="#2563EB" size={16} />
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </Button>

                          {booking.canModify && (
                            <Button
                              onClick={() => handleModifyBooking(booking)}
                              disabled={isLoading}
                              className="text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <Edit color="#EA580C" size={16} />
                              Modify
                            </Button>
                          )}

                          {booking.canCancel && (
                            <Button
                              onClick={() => handleCancelBooking(booking)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <Trash color="#DC2626" size={16} />
                              Cancel
                            </Button>
                          )}

                          <Button
                            onClick={() => handleContactHotel(booking)}
                            className="text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <MessageText color="#6B7280" size={16} />
                            Contact Hotel
                          </Button>

                          <Button
                            onClick={() => handleDownloadConfirmation(booking)}
                            disabled={isLoading}
                            className="text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <DocumentDownload color="#6B7280" size={16} />
                            Download
                          </Button>

                          {booking.canReview && (
                            <Button
                              onClick={() => handleLeaveReview(booking)}
                              className="text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <Star1 color="#15803D" size={16} />
                              Leave Review
                            </Button>
                          )}

                          {booking.status === 'completed' && (
                            <Button
                              onClick={() => handleBookAgain(booking)}
                              className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <Calendar color="#2563EB" size={16} />
                              Book Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          
                          {/* Left Column - Booking Details */}
                          <div className="space-y-6">
                            
                            {/* Guest Information */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Profile color="#3B82F6" size={20} />
                                Guest Information
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Name:</span>
                                  <span className="font-medium text-gray-900">{booking.guestDetails.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Email:</span>
                                  <span className="font-medium text-gray-900">{booking.guestDetails.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Phone:</span>
                                  <span className="font-medium text-gray-900">{booking.guestDetails.phone}</span>
                                </div>
                              </div>
                            </div>

                            {/* Room Details */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Bed color="#3B82F6" size={20} />
                                Room Details
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Room Type:</span>
                                  <span className="font-medium text-gray-900">{booking.roomType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Rooms:</span>
                                  <span className="font-medium text-gray-900">{booking.rooms}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Guests:</span>
                                  <span className="font-medium text-gray-900">{booking.guests}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Duration:</span>
                                  <span className="font-medium text-gray-900">{booking.nights} nights</span>
                                </div>
                              </div>
                            </div>

                            {/* Special Requests */}
                            {booking.specialRequests && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <MessageText color="#3B82F6" size={20} />
                                  Special Requests
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="text-gray-700">{booking.specialRequests}</p>
                                </div>
                              </div>
                            )}

                            {/* Booking Timeline */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Clock color="#3B82F6" size={20} />
                                Booking Timeline
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
                                    <p className="text-xs text-gray-600">{formatLongDate(booking.bookingDate)}</p>
                                  </div>
                                </div>
                                
                                {booking.status === 'upcoming' && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div>
                                      <p className="text-sm text-gray-600">Check-in</p>
                                      <p className="text-xs text-gray-500">{formatLongDate(booking.checkIn)}</p>
                                    </div>
                                  </div>
                                )}

                                {booking.status === 'completed' && (
                                  <>
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">Stay Completed</p>
                                        <p className="text-xs text-gray-600">{formatLongDate(booking.checkOut)}</p>
                                      </div>
                                    </div>
                                  </>
                                )}

                                {booking.status === 'cancelled' && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div>
                                      <p className="text-sm font-medium text-red-600">Booking Cancelled</p>
                                      <p className="text-xs text-gray-600">Refund processed</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Hotel & Contact Info */}
                          <div className="space-y-6">
                            
                            {/* Hotel Information */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Building color="#3B82F6" size={20} />
                                Hotel Information
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Hotel:</span>
                                  <span className="font-medium text-gray-900">{booking.hotelName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Location:</span>
                                  <span className="font-medium text-gray-900">{booking.hotelLocation}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Rating:</span>
                                  <div className="flex items-center gap-1">
                                    <Star1 color="#F59E0B" size={16} variant="Bold" />
                                    <span className="font-medium text-gray-900">{booking.hotelRating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Call color="#3B82F6" size={20} />
                                Contact Information
                              </h4>
                              <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="text-sm text-gray-600 mb-2">Hotel Contact</p>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Call color="#6B7280" size={16} />
                                      <span className="text-sm text-gray-900">{booking.hotelContact.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MessageText color="#6B7280" size={16} />
                                      <span className="text-sm text-gray-900">{booking.hotelContact.email}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Room Photos */}
                            {booking.roomImages.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <Camera color="#3B82F6" size={20} />
                                  Room Photos
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {booking.roomImages.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`${booking.roomType} - Photo ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-lg"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Price Breakdown */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <MoneyRecive color="#3B82F6" size={20} />
                                Price Breakdown
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Room Rate ({booking.nights} nights):</span>
                                  <span className="text-gray-900">${Math.round(booking.totalPrice * 0.85).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Taxes & Fees:</span>
                                  <span className="text-gray-900">${Math.round(booking.totalPrice * 0.15).toLocaleString()}</span>
                                </div>
                                {booking.originalPrice && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="text-green-600">-${(booking.originalPrice - booking.totalPrice).toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="border-t pt-2 flex justify-between">
                                  <span className="font-semibold text-gray-900">Total:</span>
                                  <span className="font-bold text-gray-900">${booking.totalPrice.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Important Dates */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Timer1 color="#3B82F6" size={20} />
                                Important Dates
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Check-in:</span>
                                  <span className="font-medium text-gray-900">{formatLongDate(booking.checkIn)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Check-out:</span>
                                  <span className="font-medium text-gray-900">{formatLongDate(booking.checkOut)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Booking Date:</span>
                                  <span className="font-medium text-gray-900">{formatLongDate(booking.bookingDate)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar color="#6B7280" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'upcoming' ? 'No Upcoming Bookings' : 'No Past Bookings'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming trips. Start planning your next adventure!"
                  : "You haven't completed any stays yet. Book your first trip!"
                }
              </p>
              <Button
                onClick={handleGoHome}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <SearchNormal1 color="#ffffff" size={20} />
                Find Hotels
              </Button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {filteredBookings.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Travel Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'completed').length}</div>
                <div className="text-sm text-gray-600">Completed Stays</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {bookings.reduce((sum, b) => sum + b.nights, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Nights</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ${bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;