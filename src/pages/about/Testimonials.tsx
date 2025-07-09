import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Quote, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const categories = ['all', 'Kilimanjaro', 'Safari', 'Cultural', 'Day Trips'];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      country: 'United States',
      tour: 'Kilimanjaro Machame Route',
      category: 'Kilimanjaro',
      rating: 5,
      date: '2024-01-15',
      title: 'Life-Changing Adventure',
      content: 'Climbing Kilimanjaro with Kilimanjaro Gates was absolutely incredible. Our guide Joseph was knowledgeable, patient, and made sure everyone in our group felt safe and supported. The views were breathtaking, and reaching Uhuru Peak was the most rewarding experience of my life. The equipment was top-notch, and the food was surprisingly good for mountain conditions. I would definitely recommend this company to anyone considering this adventure.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      country: 'Canada',
      tour: 'Serengeti Safari Adventure',
      category: 'Safari',
      rating: 5,
      date: '2024-02-20',
      title: 'Beyond Expectations',
      content: 'The safari exceeded all our expectations! We saw all of the Big Five, witnessed the Great Migration, and our guide Sarah\'s knowledge of animal behavior was extraordinary. She knew exactly where to find the animals and could predict their movements. The accommodations were comfortable, and the whole experience was seamlessly organized. The photography opportunities were endless, and we came home with memories that will last a lifetime.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 3,
      name: 'Emma Wilson',
      country: 'United Kingdom',
      tour: 'Cultural Village Experience',
      category: 'Cultural',
      rating: 5,
      date: '2024-03-10',
      title: 'Authentic Cultural Immersion',
      content: 'The cultural tour was incredibly authentic and respectful. Michael, our guide, facilitated meaningful interactions with the Maasai community. We learned about traditional customs, participated in daily activities, and gained a deep appreciation for their way of life. The experience was educational, humbling, and transformative. It\'s clear that Kilimanjaro Gates has genuine relationships with the communities they work with.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 4,
      name: 'David Rodriguez',
      country: 'Spain',
      tour: 'Ngorongoro Crater Day Trip',
      category: 'Day Trips',
      rating: 5,
      date: '2024-03-25',
      title: 'Perfect Day Trip',
      content: 'Even though it was just a day trip, the experience was phenomenal. The Ngorongoro Crater is like a natural zoo with incredible wildlife density. Our guide was punctual, professional, and very knowledgeable about the ecosystem. We saw lions, elephants, rhinos, and countless other animals. The lunch was delicious, and the whole day was perfectly organized. Highly recommended for those with limited time.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      country: 'Australia',
      tour: 'Mount Meru Climbing',
      category: 'Kilimanjaro',
      rating: 5,
      date: '2024-04-05',
      title: 'Perfect Kilimanjaro Preparation',
      content: 'Mount Meru was the perfect warm-up for Kilimanjaro! The trek was challenging but manageable, and the views of Kilimanjaro from Meru were spectacular. Our guide David was excellent - very experienced and great company. The wildlife encounters on the lower slopes were a bonus. The whole experience gave me confidence for my upcoming Kilimanjaro climb. The logistics were flawless.',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 6,
      name: 'James Thompson',
      country: 'New Zealand',
      tour: 'Tarangire Safari',
      category: 'Safari',
      rating: 5,
      date: '2024-04-18',
      title: 'Elephant Paradise',
      content: 'Tarangire National Park was absolutely amazing! The elephant herds were massive and so close to our vehicle. The baobab trees created a magical landscape, especially during sunset. Our guide Grace was fantastic - she had an incredible eye for spotting animals and knew all the best locations. The park was less crowded than Serengeti, which made the experience more intimate and special.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 7,
      name: 'Maria Gonzalez',
      country: 'Mexico',
      tour: 'Coffee Plantation Tour',
      category: 'Cultural',
      rating: 5,
      date: '2024-05-02',
      title: 'Educational and Delicious',
      content: 'The coffee plantation tour was a delightful surprise! We learned about the entire coffee-making process from bean to cup. The local farmers were so welcoming and proud to share their knowledge. Tasting fresh coffee right from the source was incredible. The tour also included beautiful walks through the plantation with stunning mountain views. A perfect blend of education and enjoyment.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    },
    {
      id: 8,
      name: 'Robert Kim',
      country: 'South Korea',
      tour: 'Kilimanjaro Lemosho Route',
      category: 'Kilimanjaro',
      rating: 5,
      date: '2024-05-15',
      title: 'Scenic Route to Success',
      content: 'The Lemosho route was absolutely spectacular! The scenery was diverse and beautiful, from rainforest to alpine desert. The longer route allowed for better acclimatization, and I felt strong throughout the climb. Our guide Peter was exceptional - always checking on everyone\'s condition and providing encouragement. The summit sunrise was the most beautiful thing I\'ve ever seen. Worth every step!',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesCategory = selectedCategory === 'all' || testimonial.category === selectedCategory;
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTestimonials = testimonials.slice(0, 3);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: '4.9/5', label: 'Average Rating' },
    { number: '2000+', label: 'Reviews' },
    { number: '98%', label: 'Would Recommend' },
    { number: '100%', label: 'Verified Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/about"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to About</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Travelers Say</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Real stories from real adventurers who have experienced the magic of Tanzania with Kilimanjaro Gates. Every review is verified and comes from actual guests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Highlighted experiences that showcase the transformative power of adventure
            </p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-96 md:h-80">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="h-full flex items-center">
                    <div className="w-full px-8 md:px-16 py-8">
                      <Quote className="h-12 w-12 text-orange-200 mb-6" />
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{testimonial.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-4">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.country}</div>
                          <div className="text-sm text-orange-600">{testimonial.tour}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {category === 'all' ? 'All Tours' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Reviews</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through all our verified guest reviews and experiences
            </p>
          </div>

          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2">{testimonial.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4">"{testimonial.content}"</p>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.country}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-orange-600 font-medium">{testimonial.tour}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No reviews found matching your criteria.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-orange-600 hover:text-orange-700"
              >
                Clear filters to see all reviews
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl text-white p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers and create memories that will last a lifetime. Your Tanzania adventure awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Book Your Adventure
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;