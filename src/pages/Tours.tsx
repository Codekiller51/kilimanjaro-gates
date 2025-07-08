import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Users, Star } from 'lucide-react';
import TourCard from '../components/common/TourCard';
import { TourPackage } from '../types';
import { db } from '../lib/supabase';

const Tours: React.FC = () => {
  const { category } = useParams();
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const categories = {
    'mountain-climbing': 'Mountain Climbing',
    'safari': 'Safari Tours',
    'day-trips': 'Day Trips',
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error } = await db.getTourPackages(category);
        if (error) throw error;
        
        if (data) {
          setTours(data);
          setFilteredTours(data);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        // Fallback to mock data for demo
        const mockTours: TourPackage[] = [
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            title: 'Kilimanjaro Machame Route',
            description: 'The most scenic route to Africa\'s highest peak',
            short_description: 'Experience the breathtaking Machame route, known for its stunning scenery and high success rate.',
            category: 'mountain-climbing',
            duration: 7,
            difficulty: 'challenging',
            price_usd: 2500,
            price_tzs: 5800000,
            max_participants: 12,
            min_participants: 2,
            images: [
              'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
              'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            itinerary: [],
            includes: ['Professional guide', 'All meals', 'Camping equipment'],
            excludes: ['International flights', 'Visa fees'],
            requirements: ['Good physical fitness', 'Medical certificate'],
            best_time: 'June - October, December - March',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440002',
            title: 'Serengeti Safari Adventure',
            description: 'Witness the Great Migration in the world\'s most famous national park',
            short_description: 'Join us for an unforgettable safari experience in the legendary Serengeti.',
            category: 'safari',
            duration: 5,
            difficulty: 'easy',
            price_usd: 1800,
            price_tzs: 4200000,
            max_participants: 8,
            min_participants: 2,
            images: [
              'https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg?auto=compress&cs=tinysrgb&w=800',
              'https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            itinerary: [],
            includes: ['4x4 safari vehicle', 'Professional guide', 'All meals'],
            excludes: ['International flights', 'Alcoholic beverages'],
            requirements: ['Valid passport', 'Yellow fever vaccination'],
            best_time: 'Year-round',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440003',
            title: 'Ngorongoro Crater Day Trip',
            description: 'Explore the world\'s largest inactive volcanic caldera',
            short_description: 'Discover the incredible wildlife of the Ngorongoro Crater in a single day.',
            category: 'day-trips',
            duration: 1,
            difficulty: 'easy',
            price_usd: 350,
            price_tzs: 800000,
            max_participants: 6,
            min_participants: 2,
            images: [
              'https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&w=800',
              'https://images.pexels.com/photos/1821644/pexels-photo-1821644.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            itinerary: [],
            includes: ['Transportation', 'Lunch', 'Park fees'],
            excludes: ['Personal expenses', 'Tips'],
            requirements: ['Comfortable walking shoes', 'Sunscreen'],
            best_time: 'Year-round',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        const filtered = category ? mockTours.filter(tour => tour.category === category) : mockTours;
        setTours(filtered);
        setFilteredTours(filtered);
      }
      setLoading(false);
    };

    fetchTours();
  }, [category]);

  useEffect(() => {
    let filtered = tours;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }

    // Duration filter
    if (selectedDuration) {
      const [min, max] = selectedDuration.split('-').map(Number);
      filtered = filtered.filter(tour => {
        if (max) {
          return tour.duration >= min && tour.duration <= max;
        }
        return tour.duration >= min;
      });
    }

    // Price filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(tour => {
        if (max) {
          return tour.price_usd >= min && tour.price_usd <= max;
        }
        return tour.price_usd >= min;
      });
    }

    setFilteredTours(filtered);
  }, [tours, searchTerm, selectedDifficulty, selectedDuration, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSelectedDuration('');
    setPriceRange('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-pulse">Loading tours...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category ? categories[category as keyof typeof categories] : 'All Tours'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Tanzania's most incredible adventures with our expertly crafted tour packages
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Difficulty */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
              <option value="extreme">Extreme</option>
            </select>

            {/* Duration */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Durations</option>
              <option value="1-1">1 Day</option>
              <option value="2-3">2-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8">8+ Days</option>
            </select>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Prices</option>
              <option value="0-500">Under $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000">$2,000+</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        {!category && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              to="/tours"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              All Tours
            </Link>
            <Link
              to="/tours/mountain-climbing"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Mountain Climbing
            </Link>
            <Link
              to="/tours/safari"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Safari Tours
            </Link>
            <Link
              to="/tours/day-trips"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Day Trips
            </Link>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTours.length} of {tours.length} tours
          </p>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No tours found matching your criteria.</div>
            <button
              onClick={clearFilters}
              className="mt-4 text-orange-600 hover:text-orange-700"
            >
              Clear filters to see all tours
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;