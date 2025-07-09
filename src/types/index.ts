// Core types for the Kilimanjaro Gates website
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  nationality?: string;
  created_at: string;
  updated_at: string;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  short_description: string;
  category: 'mountain-climbing' | 'safari' | 'day-trips';
  duration: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  price_usd: number;
  price_tzs: number;
  max_participants: number;
  min_participants: number;
  images: string[];
  itinerary: DayItinerary[];
  includes: string[];
  excludes: string[];
  requirements: string[];
  best_time: string;
  created_at: string;
  updated_at: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals?: string[];
  elevation_gain?: number;
  distance?: number;
}

export interface Booking {
  id: string;
  user_id: string;
  tour_id: string;
  start_date: string;
  participants: number;
  total_amount: number;
  currency: 'USD' | 'TZS';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  participant_details: ParticipantDetail[];
  created_at: string;
  updated_at: string;
}

export interface ParticipantDetail {
  name: string;
  age: number;
  nationality: string;
  dietary_requirements?: string;
  medical_conditions?: string;
}

export interface Review {
  id: string;
  user_id: string;
  tour_id: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  created_at: string;
  user?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  created_at: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  featured_image: string;
  images: string[];
  category: 'mountain' | 'park' | 'cultural' | 'coastal' | 'adventure';
  location: {
    latitude: number;
    longitude: number;
    region: string;
    district?: string;
  };
  best_time_to_visit: string;
  activities: string[];
  highlights: string[];
  difficulty_level: 'easy' | 'moderate' | 'challenging' | 'extreme';
  duration_recommended: string;
  entry_requirements: string[];
  accommodation_options: string[];
  transportation: string[];
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TravelInfo {
  id: string;
  title: string;
  slug: string;
  category: 'tips' | 'packing' | 'visa' | 'best-time' | 'health-safety' | 'currency' | 'weather';
  content: string;
  excerpt: string;
  featured_image: string;
  tags: string[];
  quick_facts: QuickFact[];
  checklist_items?: string[];
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuickFact {
  label: string;
  value: string;
  icon?: string;
}