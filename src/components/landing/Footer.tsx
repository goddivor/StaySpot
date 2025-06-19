// src/components/landing/Footer.tsx
import React from 'react';
import { Logo } from '../ui/logo';

const Footer: React.FC = () => {
  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' }
  ];

  const supportLinks = [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Cancellation Policy', href: '/cancellation' },
    { label: 'Safety', href: '/safety' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ];

  const handleLinkClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo size={40} className="text-white" />
              <span className="text-xl font-bold">StaySpot</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for finding perfect accommodations worldwide. Making travel dreams come true, one stay at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 StaySpot. All rights reserved. Made with ❤️ for travelers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;