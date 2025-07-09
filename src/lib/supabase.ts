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
  getTourPackages: async (category?: string) => {
    let query = supabase
      .from('tour_packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getTourPackage: async (id: string) => {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .maybeSingle();
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
        tour_packages (
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
      .eq('tour_id', tourId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Blog posts
  getBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
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
};