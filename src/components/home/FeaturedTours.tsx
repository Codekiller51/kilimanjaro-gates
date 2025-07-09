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
      try {
        const { data, error } = await db.getFeaturedTours();
        
        if (error) {
          console.error('Error fetching featured tours:', error);
          setTours([]);
        } else {
          setTours(data || []);
        }
      } catch (error) {
        console.error('Error fetching featured tours:', error);
        setTours([]);
      } finally {
        setLoading(false);
      }
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