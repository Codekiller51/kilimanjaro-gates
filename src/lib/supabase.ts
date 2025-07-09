import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    }
    if (filters.minDuration) {
      query = query.gte('duration', filters.minDuration);
    }
    if (filters.maxDuration) {
          category,
          price_usd,
          difficulty
    }
    if (filters.minPrice) {
      query = query.gte('price_usd', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price_usd', filters.maxPrice);
    }
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

    const { data, error } = await query.order('created_at', { ascending: false });
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
      .eq('verified', true)
      `)
      .eq('tour_id', tourId)
      .order('created_at', { ascending: false });
    return { data, error };
  createReview: async (review: Partial<Review>) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
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
  },

  // Blog posts
  getBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
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
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert(inquiry)
      .select()
      .single();
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
};
  updateBooking: async (id: string, updates: Partial<Booking>) => {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
