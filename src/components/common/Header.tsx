import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain, User, LogOut, ChevronDown, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { auth } from '../../lib/supabase';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await auth.getUser();
      setUser(currentUser);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'Safari and Tours',
      href: '/tours',
      dropdown: [
        {
          category: 'Kilimanjaro climbing packages',
          items: [
            { name: 'Machame Route', href: '/tours/mountain-climbing/machame' },
            { name: 'Marangu Route', href: '/tours/mountain-climbing/marangu' },
            { name: 'Lemosho Route', href: '/tours/mountain-climbing/lemosho' },
            { name: 'Rongai Route', href: '/tours/mountain-climbing/rongai' }
          ]
        },
        {
          category: 'Wildlife safari',
          items: [
            { name: 'Serengeti Safari', href: '/tours/safari/serengeti' },
            { name: 'Ngorongoro Crater', href: '/tours/safari/ngorongoro' },
            { name: 'Tarangire Safari', href: '/tours/safari/tarangire' },
            { name: 'Lake Manyara', href: '/tours/safari/manyara' }
          ]
        },
        {
          category: 'Daytrips and safari camps',
          items: [
            { name: 'Cultural Tours', href: '/tours/day-trips/cultural' },
            { name: 'Coffee Tours', href: '/tours/day-trips/coffee' },
            { name: 'Waterfall Hikes', href: '/tours/day-trips/waterfalls' }
          ]
        },
        {
          category: 'Zanzibar Trips',
          items: [
            { name: 'Stone Town Tour', href: '/tours/zanzibar/stone-town' },
            { name: 'Spice Tours', href: '/tours/zanzibar/spice' },
            { name: 'Beach Holidays', href: '/tours/zanzibar/beach' }
          ]
        }
      ]
    },
    {
      name: 'Destinations',
      href: '/destinations',
      dropdown: [
        {
          category: 'Mount Kilimanjaro',
          items: [
            { name: 'Uhuru Peak', href: '/destinations/kilimanjaro/uhuru-peak' },
            { name: 'Stella Point', href: '/destinations/kilimanjaro/stella-point' }
          ]
        },
        {
          category: 'National Parks',
          items: [
            { name: 'Serengeti National Park', href: '/destinations/serengeti' },
            { name: 'Ngorongoro Crater', href: '/destinations/ngorongoro' },
            { name: 'Bagamoyo', href: '/destinations/bagamoyo' },
            { name: 'Lake Manyara', href: '/destinations/manyara' }
          ]
        }
      ]
    },
    {
      name: 'About Us',
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about/story' },
        { name: 'Our Team', href: '/about/team' },
        { name: 'Why Choose Us', href: '/about/why-choose-us' },
        { name: 'Gallery', href: '/gallery' }
      ]
    },
    {
      name: 'Travel Info',
      href: '/travel-info',
      dropdown: [
        { name: 'Travel Tips', href: '/travel-info/tips' },
        { name: 'What to Pack', href: '/travel-info/packing' },
        { name: 'Visa & Entry', href: '/travel-info/visa' },
        { name: 'Best Time to Visit', href: '/travel-info/best-time' },
        { name: 'Health and Safety', href: '/travel-info/health-safety' }
      ]
    },
    { name: 'Contact Us', href: '/contact' }
  ];

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+255 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@kilimanjarogates.com</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Moshi, Tanzania</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg top-0' : 'bg-transparent top-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className={`h-8 w-8 ${isScrolled ? 'text-orange-600' : 'text-white'}`} />
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Kilimanjaro Gates
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center space-x-1 transition-colors duration-200 ${
                        location.pathname.startsWith(item.href)
                          ? isScrolled 
                            ? 'text-orange-600 font-semibold' 
                            : 'text-orange-300 font-semibold'
                          : isScrolled
                            ? 'text-gray-700 hover:text-orange-600'
                            : 'text-white hover:text-orange-300'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`transition-colors duration-200 ${
                        location.pathname === item.href
                          ? isScrolled 
                            ? 'text-orange-600 font-semibold' 
                            : 'text-orange-300 font-semibold'
                          : isScrolled
                            ? 'text-gray-700 hover:text-orange-600'
                            : 'text-white hover:text-orange-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50">
                      <div className="grid grid-cols-1 gap-4 px-4">
                        {item.dropdown.map((section, index) => (
                          <div key={index}>
                            {section.category && (
                              <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                                {section.category}
                              </h3>
                            )}
                            <div className="space-y-1">
                              {(section.items || [section]).map((subItem: any, subIndex: number) => (
                                <Link
                                  key={subIndex}
                                  to={subItem.href}
                                  onClick={closeDropdown}
                                  className="block px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* User Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile" 
                    className={`flex items-center space-x-2 ${
                      isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-300'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center space-x-2 ${
                      isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-300'
                    }`}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className={`${
                      isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-300'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="pl-4 space-y-1">
                            {item.dropdown.map((section, index) => (
                              <div key={index}>
                                {section.category && (
                                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {section.category}
                                  </div>
                                )}
                                {(section.items || [section]).map((subItem: any, subIndex: number) => (
                                  <Link
                                    key={subIndex}
                                    to={subItem.href}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-3 py-2 text-base font-medium ${
                          location.pathname === item.href
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="border-t pt-2">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-2 text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay to close dropdown when clicking outside */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={closeDropdown}
        ></div>
      )}
    </>
  );
};

export default Header;