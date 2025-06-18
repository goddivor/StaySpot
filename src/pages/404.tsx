import React from 'react';
import { Home2, SearchNormal1, ArrowLeft } from 'iconsax-react';
import Button from '../components/Button';

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = () => {
    window.location.href = '/search';
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-indigo-200/35 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/25 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-r from-purple-300/25 to-indigo-300/25 rotate-12 animate-spin" style={{animationDuration: '15s'}}></div>
        
        {/* Moving Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          <div className="absolute top-40 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
      
      <div className="max-w-2xl w-full text-center relative z-10">

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Large 404 Text with glow effect */}
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400 select-none drop-shadow-lg">
              404
            </h1>
            
            {/* Hotel Icon Overlay with enhanced styling */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-2xl border border-white/50 animate-pulse">
                <svg 
                  className="w-16 h-16 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Room Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2 max-w-md mx-auto">
            Oops! The page you're looking for seems to have checked out early.
          </p>
          <p className="text-gray-500">
            Don't worry, there are plenty of other amazing destinations waiting for you!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#4338ca] hover:to-[#6d28d9] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 min-w-[180px] backdrop-blur-sm"
          >
            <Home2 
              color="white" 
              size={20} 
              className="text-white"
            />
            Go to Homepage
          </Button>

          <Button
            onClick={handleSearch}
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 px-8 py-3 rounded-lg font-medium border border-white/60 transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 min-w-[180px]"
          >
            <SearchNormal1 
              color="#374151" 
              size={20} 
              className="text-gray-700"
            />
            Search Hotels
          </Button>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={handleGoBack}
            className="text-gray-600 hover:text-gray-800 underline underline-offset-4 transition-all duration-300 flex items-center gap-2 mx-auto bg-transparent hover:scale-105"
          >
            <ArrowLeft 
              color="#6b7280" 
              size={16} 
              className="text-gray-500"
            />
            Go back to previous page
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-600">
          Need help? <a href="/contact" className="text-[#4f46e5] hover:text-[#7c3aed] underline-offset-4 hover:underline transition-colors duration-300">Contact our support team</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;