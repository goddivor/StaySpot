// src/pages/client/About.tsx
import React from 'react';
import { 
  Award, 
  People, 
  Global,
  ShieldTick,
  Heart,
  Star1,
  TickCircle,
  Personalcard,
  Call,
  Message,
  Location
} from 'iconsax-react';
import { Logo } from '../../components/ui/logo';
import Button from '../../components/Button';

const About: React.FC = () => {
  const stats = [
    { number: '2M+', label: 'Happy Travelers', icon: <People color="#059669" size={24} /> },
    { number: '50K+', label: 'Hotels Worldwide', icon: <Global color="#059669" size={24} /> },
    { number: '150+', label: 'Countries', icon: <Location color="#059669" size={24} /> },
    { number: '4.8/5', label: 'Average Rating', icon: <Star1 color="#059669" size={24} /> }
  ];

  const values = [
    {
      icon: <Heart color="#EF4444" size={32} />,
      title: 'Customer First',
      description: 'Every decision we make puts our travelers at the center. Your comfort, satisfaction, and memorable experiences drive everything we do.'
    },
    {
      icon: <ShieldTick color="#059669" size={32} />,
      title: 'Trust & Transparency',
      description: 'We believe in honest pricing, clear policies, and reliable service. No hidden fees, no surprises – just straightforward, trustworthy travel booking.'
    },
    {
      icon: <Award color="#F59E0B" size={32} />,
      title: 'Excellence',
      description: 'We partner only with quality accommodations and continuously improve our platform to deliver exceptional travel experiences.'
    },
    {
      icon: <Global color="#3B82F6" size={32} />,
      title: 'Global Reach',
      description: 'From boutique hotels in Paris to beach resorts in Bali, we connect you with amazing stays in every corner of the world.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Former travel industry executive with 15+ years of experience. Sarah founded StaySpot to revolutionize how people discover and book accommodations.',
      linkedin: '#'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech visionary who previously led engineering teams at major travel platforms. Michael ensures our technology delivers seamless user experiences.',
      linkedin: '#'
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Hospitality industry veteran who builds relationships with hotels worldwide, ensuring we offer the best accommodations to our users.',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Experience',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'Customer service expert dedicated to making every interaction with StaySpot helpful, friendly, and solution-focused.',
      linkedin: '#'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'StaySpot Founded',
      description: 'Started with a vision to make travel booking simple and transparent'
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Reached 25 countries and 5,000 hotel partners'
    },
    {
      year: '2022',
      title: '1M Users',
      description: 'Celebrated our first million happy travelers'
    },
    {
      year: '2023',
      title: 'Mobile App Launch',
      description: 'Introduced mobile apps for iOS and Android'
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Won "Best Travel Platform" at the Global Travel Awards'
    },
    {
      year: '2025',
      title: 'AI Integration',
      description: 'Launched AI-powered personalized recommendations'
    }
  ];

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContact = () => {
    window.location.href = '/contact';
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
              About StaySpot
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to make travel accessible, affordable, and unforgettable for everyone. 
              Since 2020, we've been connecting travelers with amazing accommodations worldwide.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={handleContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  StaySpot was born from a simple frustration: booking hotels shouldn't be complicated, 
                  expensive, or full of surprises. Our founders, avid travelers themselves, experienced 
                  firsthand the pain points of existing travel platforms.
                </p>
                <p>
                  In 2020, we set out to create something different. A platform that puts travelers first, 
                  with transparent pricing, reliable customer service, and a curated selection of quality 
                  accommodations.
                </p>
                <p>
                  Today, we're proud to serve millions of travelers worldwide, helping them discover 
                  amazing stays and create unforgettable memories. But we're just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Team working together"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">5 Years</div>
                <div className="text-sm">Of Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional experiences to our travelers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a startup idea to a global travel platform - here are the key milestones in our story.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-blue-600 hidden md:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>
                  
                  {/* Spacer for opposite side */}
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind StaySpot, working every day to make your travel dreams come true.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <Button
                    onClick={() => window.open(member.linkedin, '_blank')}
                    className="text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-50 px-3 py-1 rounded text-sm transition-colors flex items-center gap-2"
                  >
                    <Personalcard color="#2563EB" size={16} />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're honored to be recognized by industry leaders and our users for our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award color="#F59E0B" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Best Travel Platform 2024</h3>
              <p className="text-gray-600">Global Travel Awards</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TickCircle color="#059669" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Choice Award</h3>
              <p className="text-gray-600">TripAdvisor 2024</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star1 color="#3B82F6" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation in Travel</h3>
              <p className="text-gray-600">Tech Travel Summit 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join millions of travelers who trust StaySpot for their accommodation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Start Booking
            </Button>
            <Button
              onClick={handleContact}
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Contact Us
            </Button>
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
              <p className="text-gray-300">
                Making travel accessible, affordable, and unforgettable for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={handleGoHome} className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Press</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={handleContact} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors">Safety</button></li>
                <li><button className="hover:text-white transition-colors">Terms</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex gap-4">
                <Button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors">
                  <Message color="white" size={20} />
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors">
                  <Call color="white" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 StaySpot. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;