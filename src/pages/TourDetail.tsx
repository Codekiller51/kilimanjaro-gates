import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Star, MapPin, Check, X, ArrowLeft } from 'lucide-react';
import { TourPackage, Review } from '../types';
import { db, auth } from '../lib/supabase';

const TourDetail: React.FC = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        if (id) {
          const { data, error } = await db.getTourPackage(id);
          if (error) throw error;
          setTour(data);
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
        // Fallback to mock data
        const mockTour: TourPackage = {
          id: id || '550e8400-e29b-41d4-a716-446655440001',
          title: 'Kilimanjaro Machame Route',
          description: 'The Machame route is one of the most popular routes to the summit of Mount Kilimanjaro. Known as the "Whiskey Route," it offers stunning scenery and a high success rate. This challenging trek takes you through diverse ecosystems, from lush rainforest to alpine desert, culminating at Uhuru Peak at 5,895 meters above sea level.',
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
            'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          itinerary: [
            {
              day: 1,
              title: 'Machame Gate to Machame Camp',
              description: 'Begin your journey through the lush rainforest',
              activities: ['Registration at Machame Gate', 'Forest hike through diverse flora', 'Wildlife spotting opportunities'],
              accommodation: 'Machame Camp',
              meals: ['Lunch', 'Dinner'],
              elevation_gain: 1200,
              distance: 11
            },
            {
              day: 2,
              title: 'Machame Camp to Shira Camp',
              description: 'Emerge from the forest into moorland',
              activities: ['Moorland trek with stunning views', 'Acclimatization walk', 'Photography opportunities'],
              accommodation: 'Shira Camp',
              meals: ['Breakfast', 'Lunch', 'Dinner'],
              elevation_gain: 850,
              distance: 5
            }
          ],
          includes: ['Professional mountain guide', 'All meals during the trek', 'Camping equipment', 'Park fees', 'Rescue fees', 'Porters'],
          excludes: ['International flights', 'Visa fees', 'Personal climbing gear', 'Tips for guides and porters', 'Travel insurance'],
          requirements: ['Good physical fitness', 'Medical certificate', 'Travel insurance', 'Proper hiking boots'],
          best_time: 'June - October, December - March',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setTour(mockTour);
      }
      setLoading(false);
    };

    const fetchReviews = async () => {
      if (id) {
        try {
          const { data, error } = await db.getTourReviews(id);
          if (error) throw error;
          setReviews(data || []);
        } catch (error) {
          console.error('Error fetching reviews:', error);
          // Mock reviews
          setReviews([
            {
              id: '550e8400-e29b-41d4-a716-446655440101',
              user_id: '550e8400-e29b-41d4-a716-446655440201',
              tour_id: id,
              rating: 5,
              title: 'Amazing Experience!',
              content: 'The Machame route was absolutely incredible. Our guide was knowledgeable and the views were breathtaking.',
              created_at: new Date().toISOString(),
              user: {
                full_name: 'Sarah Johnson',
                avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
              }
            }
          ]);
        }
      }
    };

    const getUser = async () => {
      const currentUser = await auth.getUser();
      setUser(currentUser);
    };

    fetchTour();
    fetchReviews();
    getUser();
  }, [id]);

  const handleBookNow = () => {
    if (user) {
      setShowBookingForm(true);
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-pulse">Loading tour details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-gray-500">Tour not found</div>
          </div>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    challenging: 'bg-orange-100 text-orange-800',
    extreme: 'bg-red-100 text-red-800',
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Tours</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={tour.images[selectedImage]}
                  alt={tour.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[tour.difficulty]}`}>
                    {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
                  </span>
                </div>
              </div>
              {tour.images.length > 1 && (
                <div className="flex space-x-2 p-4">
                  {tour.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-orange-600' : 'border-gray-300'
                      }`}
                    >
                      <img src={image} alt={`${tour.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tour Details */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{tour.title}</h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>Max {tour.max_participants} people</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">{tour.description}</p>

              {/* Itinerary */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h3>
                  <div className="space-y-4">
                    {tour.itinerary.map((day, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Day {day.day}: {day.title}
                        </h4>
                        <p className="text-gray-600 mb-3">{day.description}</p>
                        {day.activities && (
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">Activities:</span>
                            <ul className="list-disc list-inside text-gray-600 ml-4">
                              {day.activities.map((activity, i) => (
                                <li key={i}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          {day.accommodation && (
                            <div>
                              <span className="font-medium">Accommodation:</span>
                              <div>{day.accommodation}</div>
                            </div>
                          )}
                          {day.meals && (
                            <div>
                              <span className="font-medium">Meals:</span>
                              <div>{day.meals.join(', ')}</div>
                            </div>
                          )}
                          {day.distance && (
                            <div>
                              <span className="font-medium">Distance:</span>
                              <div>{day.distance} km</div>
                            </div>
                          )}
                          {day.elevation_gain && (
                            <div>
                              <span className="font-medium">Elevation:</span>
                              <div>+{day.elevation_gain}m</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Includes/Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <X className="h-5 w-5 text-red-600" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tour.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Time */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Best Time to Visit</h3>
                <p className="text-gray-600">{tour.best_time}</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <img
                          src={review.user?.avatar_url || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'}
                          alt={review.user?.full_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{review.user?.full_name}</div>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-600">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review this tour!</p>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-orange-600">${tour.price_usd}</div>
                <div className="text-gray-500">per person</div>
                <div className="text-sm text-gray-400">TZS {tour.price_tzs.toLocaleString()}</div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg mb-4"
              >
                Book Now
              </button>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Group size:</span>
                  <span>{tour.min_participants}-{tour.max_participants} people</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="capitalize">{tour.difficulty}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact our travel experts for personalized assistance.
                </p>
                <button className="w-full border border-orange-600 text-orange-600 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;