import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold">Kilimanjaro Gates</span>
            </div>
            <p className="text-gray-400">
              Your premier gateway to Tanzania's most spectacular adventures. 
              Experience the magic of Mount Kilimanjaro, safari wildlife, and cultural immersion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tours/mountain-climbing" className="text-gray-400 hover:text-orange-600 transition-colors">
                  Mountain Climbing
                </Link>
              </li>
              <li>
                <Link to="/tours/safari" className="text-gray-400 hover:text-orange-600 transition-colors">
                  Safari Tours
                </Link>
              </li>
              <li>
                <Link to="/tours/day-trips" className="text-gray-400 hover:text-orange-600 transition-colors">
                  Day Trips
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-orange-600 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-orange-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Kilimanjaro Climbing</li>
              <li className="text-gray-400">Safari Adventures</li>
              <li className="text-gray-400">Cultural Tours</li>
              <li className="text-gray-400">Photography Tours</li>
              <li className="text-gray-400">Group Expeditions</li>
              <li className="text-gray-400">Custom Itineraries</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-600" />
                <span className="text-gray-400">Moshi, Tanzania</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-600" />
                <span className="text-gray-400">+255 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-600" />
                <span className="text-gray-400">info@kilimanjarogates.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Kilimanjaro Gates. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-orange-600 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;