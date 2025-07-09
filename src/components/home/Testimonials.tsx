import React from 'react';
import { Star, Quote } from 'lucide-react';
import { db } from '../../lib/supabase';

interface ReviewWithDetails {
  id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
    nationality?: string;
  };
  tour_packages?: {
    title: string;
    category: string;
  };
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<ReviewWithDetails[]>([]);
  const [stats, setStats] = React.useState({
    averageRating: 4.9,
    totalReviews: 2000,
    recommendationRate: 98
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Fetch featured reviews for testimonials
        const { data: reviews, error: reviewsError } = await db.getFeaturedReviews(3);
        if (reviewsError) throw reviewsError;
        setTestimonials(reviews || []);

        // Fetch review stats
        const { averageRating, totalReviews, recommendationRate, error: statsError } = await db.getReviewStats();
        if (statsError) throw statsError;
        setStats({ averageRating, totalReviews, recommendationRate });

      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep default values if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading testimonials...</div>
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
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the adventurers who've experienced the magic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-orange-200" />
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content.length > 150 ? testimonial.content.substring(0, 150) + '...' : testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.profiles?.avatar_url || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                  alt={testimonial.profiles?.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.profiles?.full_name}</div>
                  <div className="text-sm text-gray-500">{testimonial.profiles?.nationality || 'Traveler'}</div>
                  <div className="text-sm text-orange-600">{testimonial.tour_packages?.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.averageRating}/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalReviews}+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.recommendationRate}%</div>
                <div className="text-gray-600">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;