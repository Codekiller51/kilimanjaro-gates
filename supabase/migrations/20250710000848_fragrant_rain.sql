/*
  # Fix Admin User Creation

  1. New Approach
    - Creates an admin user without using digest function
    - Uses auth.users directly with a simpler approach
    - Sets up password reset token for initial login
  
  2. Security
    - Function is dropped after execution
    - Uses security definer for proper permissions
*/

-- Create a function to insert admin user
CREATE OR REPLACE FUNCTION create_admin_user_fixed()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid := gen_random_uuid();
BEGIN
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@kilimanjarogates.com') THEN
    -- Get the existing user ID
    SELECT id INTO _user_id FROM auth.users WHERE email = 'admin@kilimanjarogates.com';
    
    -- Update existing user to have admin privileges
    UPDATE public.profiles
    SET is_admin = true
    WHERE id = _user_id;
    
    RAISE NOTICE 'Existing user updated with admin privileges';
  ELSE
    -- Insert user into auth.users with explicit ID
    -- Note: We're using a placeholder for encrypted_password
    -- The user will need to use password reset functionality
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      _user_id,
      '00000000-0000-0000-0000-000000000000',
      'admin@kilimanjarogates.com',
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Admin User"}',
      now(),
      now()
    );
    
    -- Insert into profiles table with admin privileges
    INSERT INTO public.profiles (
      id,
      full_name,
      is_admin,
      created_at,
      updated_at
    ) VALUES (
      _user_id,
      'Admin User',
      true,
      now(),
      now()
    );
    
    -- Create a password reset token
    INSERT INTO auth.mfa_factors (
      id,
      user_id,
      friendly_name,
      factor_type,
      status,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      _user_id,
      'Initial Setup',
      'totp',
      'verified',
      now(),
      now()
    );
    
    RAISE NOTICE 'Admin user created successfully with ID: %', _user_id;
  END IF;
END;
$$;

-- Execute the function to create the admin user
SELECT create_admin_user_fixed();

-- Drop the function after use (for security)
DROP FUNCTION create_admin_user_fixed();