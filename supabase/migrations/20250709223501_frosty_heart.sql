/*
  # Add admin role to profiles table

  1. Schema Changes
    - Add `is_admin` column to profiles table
    - Set default value to false
    - Update RLS policies to allow admin access

  2. Security
    - Add RLS policies for admin users to manage content
    - Ensure proper access control for administrative functions
*/

-- Add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Create admin user (will be updated manually after creation)
DO $$
DECLARE
  admin_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE is_admin = true
  ) INTO admin_exists;
  
  IF NOT admin_exists THEN
    -- Note: This is just a placeholder. The actual admin user should be created
    -- through the registration process and then manually updated to is_admin=true
    RAISE NOTICE 'No admin users found. Please create an admin user through the registration process.';
  END IF;
END $$;

-- Update RLS policies for admin access to tour_packages
CREATE POLICY IF NOT EXISTS "Admins can manage tour packages"
  ON tour_packages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to bookings
CREATE POLICY IF NOT EXISTS "Admins can manage bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to reviews
CREATE POLICY IF NOT EXISTS "Admins can manage reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to profiles
CREATE POLICY IF NOT EXISTS "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to blog_posts
CREATE POLICY IF NOT EXISTS "Admins can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to contact_inquiries
CREATE POLICY IF NOT EXISTS "Admins can manage contact inquiries"
  ON contact_inquiries
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to destinations
CREATE POLICY IF NOT EXISTS "Admins can manage destinations"
  ON destinations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to travel_info
CREATE POLICY IF NOT EXISTS "Admins can manage travel info"
  ON travel_info
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to payments
CREATE POLICY IF NOT EXISTS "Admins can manage payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update RLS policies for admin access to customer_surveys
CREATE POLICY IF NOT EXISTS "Admins can manage customer surveys"
  ON customer_surveys
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );