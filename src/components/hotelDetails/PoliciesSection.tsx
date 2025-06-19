// src/components/hotelDetails/PoliciesSection.tsx
import React, { useState } from 'react';
import { 
  Clock, 
  MoneyRecive, 
  Profile2User, 
  Pet, 
  SecuritySafe, 
  TickCircle, 
  CloseCircle,
  ShieldTick,
  InfoCircle,
  DirectRight
} from 'iconsax-react';
import type { HotelPolicies } from '../../mocks/hotelDetailsData';

interface PoliciesSectionProps {
  policies: HotelPolicies;
}

const PoliciesSection: React.FC<PoliciesSectionProps> = ({ policies }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatPaymentMethods = (methods: string[]) => {
    return methods.join(', ');
  };

  const policyItems = [
    {
      id: 'checkin-checkout',
      icon: <Clock color="#059669" size={24} />,
      title: 'Check-in & Check-out',
      preview: `Check-in: ${policies.checkIn} • Check-out: ${policies.checkOut}`,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <TickCircle color="#059669" size={18} />
                Check-in
              </h4>
              <p className="text-gray-700">{policies.checkIn}</p>
              <p className="text-sm text-gray-600 mt-1">
                Early check-in may be available upon request
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <CloseCircle color="#EF4444" size={18} />
                Check-out
              </h4>
              <p className="text-gray-700">{policies.checkOut}</p>
              <p className="text-sm text-gray-600 mt-1">
                Late check-out may be available for an additional fee
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cancellation',
      icon: <MoneyRecive color="#059669" size={24} />,
      title: 'Cancellation Policy',
      preview: policies.cancellation.title,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
              <TickCircle color="#059669" size={18} />
              {policies.cancellation.title}
            </h4>
            <p className="text-green-800 mb-2">{policies.cancellation.description}</p>
            <p className="text-sm text-green-700">
              Cancellation must be made at least {policies.cancellation.cutoffTime} before check-in
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>• Cancellations made after the deadline may result in charges</p>
            <p>• No-shows will be charged the full amount</p>
            <p>• Group bookings may have different cancellation terms</p>
          </div>
        </div>
      )
    },
    {
      id: 'children-pets',
      icon: <Profile2User color="#059669" size={24} />,
      title: 'Children & Pets',
      preview: `Children ${policies.children.allowed ? 'welcome' : 'not allowed'} • Pets ${policies.pets.allowed ? 'allowed' : 'not allowed'}`,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Profile2User color="#374151" size={18} />
                Children Policy
              </h4>
              {policies.children.allowed ? (
                <div className="space-y-2">
                  <p className="text-green-700 flex items-center gap-2">
                    <TickCircle color="#059669" size={16} />
                    Children are welcome
                  </p>
                  {policies.children.ageLimit && (
                    <p className="text-sm text-gray-700">
                      Children under {policies.children.ageLimit} stay free when using existing bedding
                    </p>
                  )}
                  {policies.children.extraBedFee && (
                    <p className="text-sm text-gray-700">
                      Extra bed fee: ${policies.children.extraBedFee} per night
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-red-700 flex items-center gap-2">
                  <CloseCircle color="#EF4444" size={16} />
                  Children not allowed
                </p>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Pet color="#374151" size={18} />
                Pet Policy
              </h4>
              {policies.pets.allowed ? (
                <div className="space-y-2">
                  <p className="text-green-700 flex items-center gap-2">
                    <TickCircle color="#059669" size={16} />
                    Pets are welcome
                  </p>
                  {policies.pets.fee && (
                    <p className="text-sm text-gray-700">
                      Pet fee: ${policies.pets.fee} per night
                    </p>
                  )}
                  {policies.pets.restrictions && (
                    <p className="text-sm text-gray-700">
                      Restrictions: {policies.pets.restrictions}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-red-700 flex items-center gap-2">
                  <CloseCircle color="#EF4444" size={16} />
                  Pets not allowed
                </p>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment',
      icon: <SecuritySafe color="#059669" size={24} />,
      title: 'Payment & Fees',
      preview: `Accepted: ${formatPaymentMethods(policies.payment.accepted)}`,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Accepted Payment Methods</h4>
              <div className="space-y-2">
                {policies.payment.accepted.map((method) => (
                  <div key={method} className="flex items-center gap-2 text-gray-700">
                    <TickCircle color="#059669" size={16} />
                    <span>{method}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Fees & Deposits</h4>
              <div className="space-y-2 text-sm text-gray-700">
                {policies.payment.deposit && (
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <span className="font-medium">{policies.payment.deposit}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes Included:</span>
                  <span className={`font-medium ${policies.payment.taxesIncluded ? 'text-green-700' : 'text-red-700'}`}>
                    {policies.payment.taxesIncluded ? 'Yes' : 'No'}
                  </span>
                </div>
                {!policies.payment.taxesIncluded && (
                  <p className="text-xs text-gray-600">
                    City tax and other local taxes may apply and are payable directly to the hotel
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'house-rules',
      icon: <ShieldTick color="#059669" size={24} />,
      title: 'House Rules',
      preview: `Smoking ${policies.smoking ? 'allowed' : 'not allowed'} • Parties ${policies.parties ? 'allowed' : 'not allowed'}`,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {policies.smoking ? (
                  <TickCircle color="#059669" size={18} />
                ) : (
                  <CloseCircle color="#EF4444" size={18} />
                )}
                <span className="text-gray-900">
                  Smoking {policies.smoking ? 'allowed in designated areas' : 'not allowed'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {policies.parties ? (
                  <TickCircle color="#059669" size={18} />
                ) : (
                  <CloseCircle color="#EF4444" size={18} />
                )}
                <span className="text-gray-900">
                  Parties/events {policies.parties ? 'allowed' : 'not allowed'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Quiet hours: 10:00 PM - 8:00 AM</p>
              <p>• No outside food or beverages</p>
              <p>• Proper attire required in public areas</p>
              <p>• Valid ID required at check-in</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'covid-measures',
      icon: <ShieldTick color="#059669" size={24} />,
      title: 'Health & Safety',
      preview: `${policies.covidMeasures.length} safety measures in place`,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <ShieldTick color="#2563EB" size={18} />
              COVID-19 Safety Measures
            </h4>
            <div className="space-y-2">
              {policies.covidMeasures.map((measure, index) => (
                <div key={index} className="flex items-start gap-2 text-blue-800">
                  <TickCircle color="#2563EB" size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{measure}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <h5 className="font-medium text-gray-900 mb-2">Additional Safety Features</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>• 24/7 security surveillance</p>
              <p>• Fire safety systems</p>
              <p>• Emergency evacuation procedures</p>
              <p>• First aid stations</p>
              <p>• Smoke detectors in all rooms</p>
              <p>• Carbon monoxide detectors</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
      
      <div className="space-y-4">
        {policyItems.map((item) => {
          const isExpanded = expandedSection === item.id;
          
          return (
            <div 
              key={item.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(item.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.preview}
                      </p>
                    </div>
                  </div>
                  <DirectRight 
                    color="#6B7280" 
                    size={20}
                    className={`transform transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Important Notice */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <InfoCircle color="#F59E0B" size={24} className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-2">Important Information</h3>
            <div className="text-yellow-800 text-sm space-y-1">
              <p>• Policies may vary based on room type and dates</p>
              <p>• Please contact the hotel directly for clarification on any policies</p>
              <p>• Some policies may have exceptions during special events or peak seasons</p>
              <p>• Local laws and regulations may supersede hotel policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-6 bg-gray-50 rounded-xl p-6">
        <h3 className="font-medium text-gray-900 mb-3">Questions About Policies?</h3>
        <p className="text-gray-600 text-sm mb-4">
          If you have any questions about our policies or need special accommodations, 
          please don't hesitate to contact us directly.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Contact Hotel
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors">
            View Full Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoliciesSection;