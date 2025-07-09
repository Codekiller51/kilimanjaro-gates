import { createClient } from '@supabase/supabase-js';

// Define types for admin operations
type AdminOperations = {
  isAdmin: boolean;
  checkAdminStatus: () => Promise<boolean>;
  getAllUsers: () => Promise<{ data: any[] | null; error: any }>;
  updateUserAdmin: (userId: string, isAdmin: boolean) => Promise<{ data: any | null; error: any }>;
  getAllTourPackages: () => Promise<{ data: any[] | null; error: any }>;
  createTourPackage: (tourData: Partial<TourPackage>) => Promise<{ data: any | null; error: any }>;
  updateTourPackage: (id: string, updates: Partial<TourPackage>) => Promise<{ data: any | null; error: any }>;
  deleteTourPackage: (id: string) => Promise<{ error: any }>;
  getAllBookings: () => Promise<{ data: any[] | null; error: any }>;
  updateBookingStatus: (id: string, status: string) => Promise<{ data: any | null; error: any }>;
  getAllReviews: () => Promise<{ data: any[] | null; error: any }>;
  verifyReview: (id: string, verified: boolean) => Promise<{ data: any | null; error: any }>;
  deleteReview: (id: string) => Promise<{ error: any }>;
  getAllBlogPosts: () => Promise<{ data: any[] | null; error: any }>;
  createBlogPost: (postData: Partial<BlogPost>) => Promise<{ data: any | null; error: any }>;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<{ data: any | null; error: any }>;
  deleteBlogPost: (id: string) => Promise<{ error: any }>;
  getAllDestinations: () => Promise<{ data: any[] | null; error: any }>;
  createDestination: (destinationData: Partial<Destination>) => Promise<{ data: any | null; error: any }>;
  updateDestination: (id: string, updates: Partial<Destination>) => Promise<{ data: any | null; error: any }>;
  deleteDestination: (id: string) => Promise<{ error: any }>;
  getAllTravelInfo: () => Promise<{ data: any[] | null; error: any }>;
  createTravelInfo: (infoData: Partial<TravelInfo>) => Promise<{ data: any | null; error: any }>;
  updateTravelInfo: (id: string, updates: Partial<TravelInfo>) => Promise<{ data: any | null; error: any }>;
  deleteTravelInfo: (id: string) => Promise<{ error: any }>;
  getAllContactInquiries: () => Promise<{ data: any[] | null; error: any }>;
  updateInquiryStatus: (id: string, status: string) => Promise<{ data: any | null; error: any }>;
  deleteInquiry: (id: string) => Promise<{ error: any }>;
  getAllPayments: () => Promise<{ data: any[] | null; error: any }>;
  getAllCustomerSurveys: () => Promise<{ data: any[] | null; error: any }>;
  respondToSurvey: (id: string, response: string) => Promise<{ data: any | null; error: any }>;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Validate that the URL is actually a valid URL
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL: "${supabaseUrl}". Please check your VITE_SUPABASE_URL in the .env file. It should be a valid URL like "https://your-project.supabase.co"`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin operations
export const admin: AdminOperations = {
  isAdmin: false,
  
  checkAdminStatus: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      admin.isAdmin = data?.is_admin || false;
      return admin.isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      admin.isAdmin = false;
      return false;
    }
  },
  
  // User management
  getAllUsers: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
  },
  
  updateUserAdmin: async (userId: string, isAdmin: boolean) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('profiles')
      .update({ is_admin: isAdmin, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
  },
  
  // Tour package management
  getAllTourPackages: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('tour_packages')
      .select('*')
      .order('created_at', { ascending: false });
  },
  
  createTourPackage: async (tourData: Partial<TourPackage>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('tour_packages')
      .insert(tourData)
      .select()
      .single();
  },
  
  updateTourPackage: async (id: string, updates: Partial<TourPackage>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('tour_packages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },
  
  deleteTourPackage: async (id: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('tour_packages')
      .delete()
      .eq('id', id);
  },
  
  // Booking management
  getAllBookings: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('bookings')
      .select(`
        *,
        profiles (
          full_name,
          email,
          phone
        ),
        tour_packages (
          title,
          category,
          duration
        )
      `)
      .order('created_at', { ascending: false });
  },
  
  updateBookingStatus: async (id: string, status: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('bookings')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
  },
  
  // Review management
  getAllReviews: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('reviews')
      .select(`
        *,
        profiles (
          full_name,
          email
        ),
        tour_packages (
          title,
          category
        )
      `)
      .order('created_at', { ascending: false });
  },
  
  verifyReview: async (id: string, verified: boolean) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('reviews')
      .update({ 
        verified, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
  },
  
  deleteReview: async (id: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
  },
  
  // Blog post management
  getAllBlogPosts: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
  },
  
  createBlogPost: async (postData: Partial<BlogPost>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();
  },
  
  updateBlogPost: async (id: string, updates: Partial<BlogPost>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },
  
  deleteBlogPost: async (id: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
  },
  
  // Destination management
  getAllDestinations: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: false });
  },
  
  createDestination: async (destinationData: Partial<Destination>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('destinations')
      .insert(destinationData)
      .select()
      .single();
  },
  
  updateDestination: async (id: string, updates: Partial<Destination>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('destinations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },
  
  deleteDestination: async (id: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('destinations')
      .delete()
      .eq('id', id);
  },
  
  // Travel info management
  getAllTravelInfo: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('travel_info')
      .select('*')
      .order('created_at', { ascending: false });
  },
  
  createTravelInfo: async (infoData: Partial<TravelInfo>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('travel_info')
      .insert(infoData)
      .select()
      .single();
  },
  
  updateTravelInfo: async (id: string, updates: Partial<TravelInfo>) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('travel_info')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },
  
  deleteTravelInfo: async (id: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('travel_info')
      .delete()
      .eq('id', id);
  },
  
  // Contact inquiry management
  getAllContactInquiries: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
  },
  
  updateInquiryStatus: async (id: string, status: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('contact_inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
  },
  
  deleteInquiry: async (id: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('contact_inquiries')
      .delete()
      .eq('id', id);
  },
  
  // Payment management
  getAllPayments: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('payments')
      .select(`
        *,
        bookings (
          id,
          user_id,
          tour_id,
          start_date,
          participants,
          profiles (
            full_name,
            email
          ),
          tour_packages (
            title
          )
        )
      `)
      .order('created_at', { ascending: false });
  },
  
  // Customer survey management
  getAllCustomerSurveys: async () => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('customer_surveys')
      .select(`
        *,
        bookings (
          id,
          user_id,
          tour_id,
          profiles (
            full_name,
            email
          ),
          tour_packages (
            title
          )
        )
      `)
      .order('created_at', { ascending: false });
  },
  
  respondToSurvey: async (id: string, response: string) => {
    await admin.checkAdminStatus();
    if (!admin.isAdmin) return { data: null, error: { message: 'Unauthorized' } };
    
    return await supabase
      .from('customer_surveys')
      .update({ 
        response_from_company: response,
        response_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
  }
};

// Helper functions for authentication
export const auth = {
  signUp: async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/profile`,
      },
    });
    
    // Log for debugging
    if (error) {
      console.error('SignUp error:', error);
    } else {
      console.log('SignUp success:', data);
      // Check if user needs email confirmation
      if (data.user && !data.user.email_confirmed_at) {
        console.log('Email confirmation required for:', data.user.email);
      }
    }
    
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // Log for debugging
    if (error) {
      console.error('SignIn error:', error);
    }
    
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Add method to resend confirmation email
  resendConfirmation: async (email: string) => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/profile`,
      }
    });
    return { data, error };
  },
};

// Helper functions for database operations
export const db = {
  // Tour packages
  getTourPackages: async (category?: string, featured?: boolean) => {
    let query = supabase
      .from('tour_packages')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getTourPackage: async (id: string) => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .maybeSingle();
    return { data, error };
  },

  getTourPackageBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle();
    return { data, error };
  },

  getFeaturedTours: async () => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);
    return { data, error };
  },

  searchTours: async (searchTerm?: string, category?: string, difficulty?: string, minPrice?: number, maxPrice?: number, minDuration?: number, maxDuration?: number) => {
    let query = supabase
      .from('tour_packages')
      .select('*')
      .eq('active', true);

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    if (minPrice !== undefined) {
      query = query.gte('price_usd', minPrice);
    }

    if (maxPrice !== undefined) {
      query = query.lte('price_usd', maxPrice);
    }

    if (minDuration !== undefined) {
      query = query.gte('duration', minDuration);
    }

    if (maxDuration !== undefined) {
      query = query.lte('duration', maxDuration);
    }

    query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });

    const { data, error } = await query;
    return { data, error };
  },

  getTourCategories: async () => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('category')
      .eq('active', true);
    
    if (error || !data) {
      return { data: [], error };
    }
    
    const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
    return { data: uniqueCategories, error: null };
  },

  // Bookings
  createBooking: async (booking: Partial<Booking>) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    return { data, error };
  },

  getUserBookings: async (userId: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        tour_packages!inner (
          title,
          images,
          duration,
          category
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Reviews
  getBooking: async (id: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        tour_packages (
          title,
          images,
          duration,
          category,
          price_usd,
          difficulty
        )
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  getTourReviews: async (tourId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('verified', true)
      .eq('tour_id', tourId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getAllReviews: async (category?: string, searchTerm?: string, limit?: number) => {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url,
          nationality
        ),
        tour_packages (
          title,
          category
        )
      `)
      .eq('verified', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('tour_packages.category', category);
    }

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getFeaturedReviews: async (limit: number = 3) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url,
          nationality
        ),
        tour_packages (
          title,
          category
        )
      `)
      .eq('verified', true)
      .eq('rating', 5)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  getReviewStats: async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('verified', true);
    
    if (error || !data || data.length === 0) {
      return { 
        averageRating: 0, 
        totalReviews: 0, 
        recommendationRate: 0,
        error 
      };
    }
    
    const totalReviews = data.length;
    const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const recommendationRate = (data.filter(review => review.rating >= 4).length / totalReviews) * 100;
    
    return { 
      averageRating: Math.round(averageRating * 10) / 10, 
      totalReviews, 
      recommendationRate: Math.round(recommendationRate),
      error: null 
    };
  },

  createReview: async (review: Partial<Review>) => {
    const user = await auth.getUser();
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const reviewData = {
      ...review,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();
    return { data, error };
  },

  getUserReviews: async (userId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        tour_packages (
          title,
          images
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  updateReview: async (id: string, updates: Partial<Review>) => {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  getTourAverageRating: async (tourId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('tour_id', tourId)
      .eq('verified', true);
    
    if (error || !data || data.length === 0) {
      return { averageRating: 0, totalReviews: 0, error };
    }
    
    const totalReviews = data.length;
    const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    return { averageRating, totalReviews, error: null };
  },

  // Blog posts
  getBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getBlogPost: async (slug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    return { data, error };
  },

  getBlogPostsByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('published_at', { ascending: false });
    return { data, error };
  },

  searchBlogPosts: async (searchTerm: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('published_at', { ascending: false });
    return { data, error };
  },

  getFeaturedBlogPosts: async (limit: number = 3) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  // Contact inquiries
  createContactInquiry: async (inquiry: Partial<ContactInquiry>) => {
    console.log('Creating contact inquiry:', inquiry);
    
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert(inquiry)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase contact inquiry error:', error);
    } else {
      console.log('Contact inquiry created successfully:', data);
    }
    
    return { data, error };
  },

  // Profile operations
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Avatar upload (placeholder for future Supabase Storage integration)
  uploadAvatar: async (userId: string, file: File) => {
    // This is a placeholder function for avatar upload
    // In a real implementation, you would use Supabase Storage:
    /*
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (error) {
      return { data: null, error };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { data: { url: publicUrl }, error: null };
    */
    
    // For now, return a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          data: { url: `https://api.dicebear.com/7.x/initials/svg?seed=${userId}` }, 
          error: null 
        });
      }, 1000);
    });
  },

  updateBooking: async (id: string, updates: Partial<Booking>) => {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Payment operations
  createPayment: async (payment: Partial<PaymentDetails>) => {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single();
    return { data, error };
  },

  getPaymentsByBooking: async (bookingId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Customer Survey operations
  createCustomerSurvey: async (survey: Partial<CustomerSurvey>) => {
    const { data, error } = await supabase
      .from('customer_surveys')
      .insert(survey)
      .select()
      .single();
    return { data, error };
  },

  getSurveyByBooking: async (bookingId: string) => {
    const { data, error } = await supabase
      .from('customer_surveys')
      .select('*')
      .eq('booking_id', bookingId)
      .single();
    return { data, error };
  },

  updateSurveyResponse: async (surveyId: string, response: string) => {
    const { data, error } = await supabase
      .from('customer_surveys')
      .update({
        response_from_company: response,
        response_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', surveyId)
      .select()
      .single();
    return { data, error };
  },

  // Destinations
  getDestinations: async (category?: string, featured?: boolean) => {
    let query = supabase
      .from('destinations')
      .select('*')
      .eq('active', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getDestination: async (slug: string) => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    return { data, error };
  },

  getFeaturedDestinations: async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(8);
    return { data, error };
  },

  searchDestinations: async (searchTerm?: string, category?: string, difficulty?: string) => {
    let query = supabase
      .from('destinations')
      .select('*')
      .eq('active', true);

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (difficulty) {
      query = query.eq('difficulty_level', difficulty);
    }

    query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });

    const { data, error } = await query;
    return { data, error };
  },

  // Travel Information
  getTravelInfo: async (category?: string, featured?: boolean) => {
    let query = supabase
      .from('travel_info')
      .select('*')
      .eq('active', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getTravelInfoBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from('travel_info')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    return { data, error };
  },

  getFeaturedTravelInfo: async () => {
    const { data, error } = await supabase
      .from('travel_info')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4);
    return { data, error };
  },

  searchTravelInfo: async (searchTerm?: string, category?: string) => {
    let query = supabase
      .from('travel_info')
      .select('*')
      .eq('active', true);

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });

    const { data, error } = await query;
    return { data, error };
  }
};
