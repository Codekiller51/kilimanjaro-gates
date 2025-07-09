import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Phone, Mail, Edit, Save, X } from 'lucide-react';
import { auth, db } from '../lib/supabase';
import { Booking } from '../types';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    nationality: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await auth.getUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      
      setUser(currentUser);
      
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await db.getProfile(currentUser.id);
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          // Create a basic profile from user data
          const basicProfile = {
            id: currentUser.id,
            full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
            email: currentUser.email,
            phone: '',
            nationality: '',
            avatar_url: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setProfile(basicProfile);
          setFormData({
            full_name: basicProfile.full_name,
            phone: basicProfile.phone || '',
            nationality: basicProfile.nationality || '',
          });
        } else {
          setProfile({
            ...profileData,
            email: currentUser.email,
          });
          setFormData({
            full_name: profileData.full_name,
            phone: profileData.phone || '',
            nationality: profileData.nationality || '',
          });
        }

        // Fetch user bookings
        const { data: bookingsData, error: bookingsError } = await db.getUserBookings(currentUser.id);
        
        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError);
          setBookings([]);
        } else {
          setBookings(bookingsData || []);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  const handleSave = async () => {
    if (!user || !profile) return;

    try {
      const { data, error } = await db.updateProfile(user.id, {
        full_name: formData.full_name,
        phone: formData.phone,
        nationality: formData.nationality,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Error updating profile:', error);
        // Show error message to user
      } else {
        setProfile({ ...profile, ...formData, updated_at: new Date().toISOString() });
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile.full_name,
      phone: profile.phone || '',
      nationality: profile.nationality || '',
    });
    setEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-pulse">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-gray-500">Profile not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                <p className="text-gray-600">{profile.email}</p>
              </div>

              <div className="space-y-4">
                {editing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{profile.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{profile.nationality || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">
                        Member since {new Date(profile.created_at).getFullYear()}
                      </span>
                    </div>
                    <button
                      onClick={() => setEditing(true)}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
              
              {bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Booking #{booking.id.slice(0, 8)}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Start Date:</span>
                          <div className="font-medium">{new Date(booking.start_date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Participants:</span>
                          <div className="font-medium">{booking.participants} people</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Amount:</span>
                          <div className="font-medium">${booking.total_amount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Currency:</span>
                          <div className="font-medium">{booking.currency}</div>
                        </div>
                      </div>

                      {booking.special_requests && (
                        <div className="mb-4">
                          <span className="text-sm text-gray-500">Special Requests:</span>
                          <div className="text-gray-700">{booking.special_requests}</div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm">
                          View Details
                        </button>
                        {booking.status === 'pending' && (
                          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm">
                            Modify Booking
                          </button>
                        )}
                        {booking.status === 'completed' && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                            Write Review
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start planning your Tanzania adventure today!
                  </p>
                  <button
                    onClick={() => navigate('/tours')}
                    className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Browse Tours
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;