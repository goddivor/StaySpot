import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./404";

// Client-Side Pages
import LandingPage from "./client/Landing";
import SearchResults from "./client/SearchResults";
import HotelDetails from "./client/HotelDetails";
import About from "./client/About";
import Contact from "./client/Contact";

// Authentication Pages
import Login from "./auth/Login";
import Register from "./auth/Register";
import PasswordReset from "./auth/PasswordReset";

// User Dashboard Pages
import UserDashboard from "./user/Dashboard";
import UserProfile from "./user/Profile";
import BookingHistory from "./user/BookingHistory";
import Favorites from "./user/Favorites";
import Reviews from "./user/Reviews";

// Booking Flow Pages
import RoomSelection from "./booking/RoomSelection";
import GuestDetails from "./booking/GuestDetails";
import Payment from "./booking/Payment";
import Confirmation from "./booking/Confirmation";

// Admin Pages
import AdminDashboard from "./admin/Dashboard";
import HotelManagement from "./admin/HotelManagement";
import AddEditHotel from "./admin/AddEditHotel";
import RoomManagement from "./admin/RoomManagement";
import BookingManagement from "./admin/BookingManagement";
import BookingCalendar from "./admin/BookingCalendar";
import GuestCommunication from "./admin/GuestCommunication";
import PhotoGallery from "./admin/PhotoGallery";
import AmenitiesManagement from "./admin/AmenitiesManagement";
import PoliciesManagement from "./admin/PoliciesManagement";
import RevenueReports from "./admin/RevenueReports";
import OccupancyCharts from "./admin/OccupancyCharts";
import GuestAnalytics from "./admin/GuestAnalytics";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
  {
    path: "/hotel/:id",
    element: <HotelDetails />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },

  // Authentication Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },

  // User Dashboard Routes
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/my-bookings",
    element: <BookingHistory />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/my-reviews",
    element: <Reviews />,
  },

  // Booking Flow Routes
  {
    path: "/book/:hotelId/rooms",
    element: <RoomSelection />,
  },
  {
    path: "/book/:hotelId/guest-details",
    element: <GuestDetails />,
  },
  {
    path: "/book/:hotelId/payment",
    element: <Payment />,
  },
  {
    path: "/booking-confirmation/:bookingId",
    element: <Confirmation />,
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/hotels",
    element: <HotelManagement />,
  },
  {
    path: "/admin/hotels/add",
    element: <AddEditHotel />,
  },
  {
    path: "/admin/hotels/:id/edit",
    element: <AddEditHotel />,
  },
  {
    path: "/admin/hotels/:id/rooms",
    element: <RoomManagement />,
  },
  {
    path: "/admin/bookings",
    element: <BookingManagement />,
  },
  {
    path: "/admin/calendar",
    element: <BookingCalendar />,
  },
  {
    path: "/admin/communication",
    element: <GuestCommunication />,
  },
  {
    path: "/admin/gallery",
    element: <PhotoGallery />,
  },
  {
    path: "/admin/amenities",
    element: <AmenitiesManagement />,
  },
  {
    path: "/admin/policies",
    element: <PoliciesManagement />,
  },
  {
    path: "/admin/reports/revenue",
    element: <RevenueReports />,
  },
  {
    path: "/admin/reports/occupancy",
    element: <OccupancyCharts />,
  },
  {
    path: "/admin/reports/guests",
    element: <GuestAnalytics />,
  },

  // 404 Route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
