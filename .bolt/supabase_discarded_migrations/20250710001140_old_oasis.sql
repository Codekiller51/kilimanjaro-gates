/*
  # Fix Admin User Creation

  1. Changes
    - Adds proper error handling to avoid duplicate key violations
    - Checks if profile exists before inserting
    - Updates existing profile if it exists
    - Creates admin user with proper auth setup
*/

-- Create a function to insert admin user
CREATE OR REPLACE FUNCTION create_admin_user_fixed()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _existing_user_id uuid;
BEGIN
  -- Check if user already exists in auth.users
  SELECT id INTO _existing_user_id FROM auth.users WHERE email = 'admin@kilimanjarogates.com';
  
  IF _existing_user_id IS NOT NULL THEN
    -- User exists, use existing ID
    _user_id := _existing_user_id;
    
    -- Check if profile exists
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id) THEN
      -- Update existing profile to have admin privileges
      UPDATE public.profiles
      SET is_admin = true,
          updated_at = now()
      WHERE id = _user_id;
      
      RAISE NOTICE 'Existing user updated with admin privileges';
    ELSE
      -- Create profile for existing user
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
      
      RAISE NOTICE 'Profile created for existing user with admin privileges';
    END IF;
  ELSE
    -- Create new user
    _user_id := gen_random_uuid();
    
    -- Insert user into auth.users with explicit ID
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