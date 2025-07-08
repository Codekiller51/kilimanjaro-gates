import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TourCard from '../common/TourCard';
import { TourPackage } from '../../types';
import { db } from '../../lib/supabase';

const FeaturedTours: React.FC = () => {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      // Since we don't have real data yet, we'll use mock data
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

      setTours(mockTours);
      setLoading(false);
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading featured tours...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular tours and experiences that showcase the best of Tanzania
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} featured={index === 0} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/tours"
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors text-lg font-semibold"
          >
            <span>View All Tours</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTours;