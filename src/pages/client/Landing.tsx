// src/pages/client/Landing.tsx
import React, { Suspense } from 'react';

// Lazy load components for better performance
const HeroSection = React.lazy(() => import('../../components/landing/HeroSection'));
const PopularDestinationsSection = React.lazy(() => import('../../components/landing/PopularDestinationsSection'));
const FeaturedHotelsSection = React.lazy(() => import('../../components/landing/FeaturedHotelsSection'));
const WhyChooseUsSection = React.lazy(() => import('../../components/landing/WhyChooseUsSection'));
const GuestReviewsSection = React.lazy(() => import('../../components/landing/GuestReviewsSection'));
const NewsletterSection = React.lazy(() => import('../../components/landing/NewsletterSection'));
const Footer = React.lazy(() => import('../../components/landing/Footer'));

// Loading component for suspense fallback
const SectionLoader: React.FC<{ height?: string }> = ({ height = 'h-96' }) => (
  <div className={`${height} flex items-center justify-center bg-gray-50`}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Load immediately */}
      <Suspense fallback={<SectionLoader height="h-screen" />}>
        <HeroSection />
      </Suspense>

      {/* Popular Destinations - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <PopularDestinationsSection />
      </Suspense>

      {/* Featured Hotels - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedHotelsSection />
      </Suspense>

      {/* Why Choose Us - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseUsSection />
      </Suspense>

      {/* Guest Reviews - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <GuestReviewsSection />
      </Suspense>

      {/* Newsletter - Lazy load */}
      <Suspense fallback={<SectionLoader height="h-64" />}>
        <NewsletterSection />
      </Suspense>

      {/* Footer - Lazy load */}
      <Suspense fallback={<SectionLoader height="h-48" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Landing;