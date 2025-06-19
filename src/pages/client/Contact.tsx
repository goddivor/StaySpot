/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/client/Contact.tsx
import React, { useState } from 'react';
import { 
  Call, 
  Message, 
  Location, 
  Clock,
  MessageQuestion,
  People,
  Headphone,
  DirectboxNotif,
  TickCircle,
  InfoCircle
} from 'iconsax-react';
import { Logo } from '../../components/ui/logo';
import Button from '../../components/Button';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';
import { CustomSelect } from '../../components/forms/custom-select';
import { useToast } from '../../context/toast-context';

const Contact: React.FC = () => {
  const { success, error } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: 'booking', label: 'Booking Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'partnership', label: 'Hotel Partnership' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'media', label: 'Media & Press' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  const contactMethods = [
    {
      icon: <Call color="#059669" size={32} />,
      title: 'Phone Support',
      description: 'Speak directly with our travel experts',
      details: [
        { label: 'US & Canada', value: '+1 (555) 123-4567' },
        { label: 'UK', value: '+44 20 7123 4567' },
        { label: 'Australia', value: '+61 2 9123 4567' }
      ],
      availability: '24/7 Support Available'
    },
    {
      icon: <Message color="#3B82F6" size={32} />,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      details: [
        { label: 'Average Response', value: '< 2 minutes' },
        { label: 'Languages', value: '12 languages supported' }
      ],
      availability: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: <DirectboxNotif color="#F59E0B" size={32} />,
      title: 'Email Support',
      description: 'Send us detailed questions or feedback',
      details: [
        { label: 'General Support', value: 'support@stayspot.com' },
        { label: 'Business Inquiries', value: 'business@stayspot.com' },
        { label: 'Press & Media', value: 'press@stayspot.com' }
      ],
      availability: 'Response within 24 hours'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 500\nSan Francisco, CA 94103',
      phone: '+1 (555) 123-4567',
      email: 'sf@stayspot.com',
      hours: 'Mon-Fri: 9AM-6PM PST'
    },
    {
      city: 'London',
      address: '45 King Street\nLondon, UK EC2V 8AS',
      phone: '+44 20 7123 4567',
      email: 'london@stayspot.com',
      hours: 'Mon-Fri: 9AM-6PM GMT'
    },
    {
      city: 'Singapore',
      address: '1 Marina Boulevard, #20-01\nSingapore 018989',
      phone: '+65 6123 4567',
      email: 'singapore@stayspot.com',
      hours: 'Mon-Fri: 9AM-6PM SGT'
    }
  ];

  const faqCategories = [
    {
      title: 'Booking & Reservations',
      icon: <MessageQuestion color="#059669" size={24} />,
      questions: [
        'How do I cancel or modify my booking?',
        'What payment methods do you accept?',
        'Can I book for someone else?',
        'How do I get my booking confirmation?'
      ]
    },
    {
      title: 'Account & Profile',
      icon: <People color="#3B82F6" size={24} />,
      questions: [
        'How do I create an account?',
        'I forgot my password, what should I do?',
        'How do I update my profile information?',
        'Can I delete my account?'
      ]
    },
    {
      title: 'Policies & Terms',
      icon: <InfoCircle color="#F59E0B" size={24} />,
      questions: [
        'What is your cancellation policy?',
        'Are there any hidden fees?',
        'What happens if my hotel cancels?',
        'How does your best price guarantee work?'
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      error('Missing Information', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      success('Message Sent!', 'We\'ll get back to you within 24 hours');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: '',
        message: ''
      });
    } catch (err) {
      error('Failed to Send', 'Please try again or contact us directly');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleChatStart = () => {
    success('Chat Started', 'A support agent will be with you shortly');
  };

  return (
    <div className="min-h-screen bg-white">
      
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
              <Button
                className="text-gray-700 hover:text-blue-600 bg-transparent hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-300"
                onClick={() => window.location.href = '/login'}
              >
                Sign In
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                onClick={() => window.location.href = '/register'}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Have questions about your booking? Need assistance with our platform? 
              Our dedicated support team is available 24/7 to help make your travel experience seamless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleChatStart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <Headphone color="white" size={20} />
                Start Live Chat
              </Button>
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. We're committed to providing fast, helpful support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                
                <div className="space-y-3 mb-6">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{detail.label}:</span>
                      <span className="font-medium text-gray-900">{detail.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-green-600 text-sm font-medium mb-4 flex items-center justify-center gap-2">
                  <TickCircle color="#059669" size={16} />
                  {method.availability}
                </div>
                
                {method.action && (
                  <Button
                    onClick={handleChatStart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    {method.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name *"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <CustomSelect
                  label="Inquiry Type"
                  options={inquiryTypes}
                  value={formData.inquiryType}
                  onChange={(value) => handleInputChange('inquiryType', value || '')}
                  placeholder="Select inquiry type"
                />
              </div>

              <Input
                label="Subject"
                type="text"
                placeholder="Brief description of your inquiry"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />

              <Textarea
                label="Message *"
                placeholder="Please provide details about your inquiry..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                required
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white flex items-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <DirectboxNotif color="white" size={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit us at one of our global offices or reach out to your local team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Location color="#059669" size={20} />
                  {office.city}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{office.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">{office.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">{office.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Hours</h4>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <Clock color="#6B7280" size={14} />
                      {office.hours}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.questions.map((question, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors text-sm p-2 hover:bg-gray-50 rounded"
                      onClick={() => success('FAQ', 'Detailed answer would be shown here')}
                    >
                      {question}
                    </button>
                  ))}
                </div>
                
                <Button
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => success('FAQ', 'Full FAQ section would open here')}
                >
                  View All FAQs
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-20 bg-red-50 border-t border-red-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Call color="#EF4444" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Emergency Support?</h2>
          <p className="text-lg text-gray-600 mb-6">
            If you're experiencing an urgent issue with your current booking or need immediate assistance while traveling, 
            our emergency support line is available 24/7.
          </p>
          <div className="space-y-4">
            <div className="text-2xl font-bold text-red-600">Emergency Hotline: +1 (555) 911-STAY</div>
            <p className="text-sm text-gray-600">
              Available 24/7 for booking emergencies, travel disruptions, and urgent accommodation issues
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo size={32} className="text-white" />
                <span className="text-xl font-bold">StaySpot</span>
              </div>
              <p className="text-gray-300 mb-4">
                Making travel accessible, affordable, and unforgettable for everyone.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors">
                  <Message color="white" size={20} />
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors">
                  <Call color="white" size={20} />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={handleGoHome} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => window.location.href = '/about'} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => window.location.href = '/search'} className="hover:text-white transition-colors">Search Hotels</button></li>
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Call color="#9CA3AF" size={16} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Message color="#9CA3AF" size={16} />
                  <span>support@stayspot.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock color="#9CA3AF" size={16} />
                  <span>24/7 Support</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">Stay updated with travel tips and exclusive deals.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 StaySpot. All rights reserved. Your trusted travel companion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;