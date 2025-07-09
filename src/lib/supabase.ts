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
