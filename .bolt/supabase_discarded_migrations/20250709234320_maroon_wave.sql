/*
  # Create Admin User

  1. New Functions
    - `create_admin_user_with_auth` - Creates an admin user using auth.users table and profiles table
  
  2. Security
    - Function is dropped after use for security
*/

-- Create a function to insert directly into auth schema tables
CREATE OR REPLACE FUNCTION create_admin_user_with_auth()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid := gen_random_uuid();
  _encrypted_password text;
BEGIN
  -- Generate encrypted password
  _encrypted_password := crypt('ABC123@kiligates.', gen_salt('bf'));
  
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'mailto@kilimanjarogates.com') THEN
    -- Get the existing user ID
    SELECT id INTO _user_id FROM auth.users WHERE email = 'mailto@kilimanjarogates.com';
    
    -- Update existing user to have admin privileges
    UPDATE public.profiles
    SET is_admin = true
    WHERE id = _user_id;
    
    RAISE NOTICE 'Existing user updated with admin privileges';
  ELSE
    -- Insert user into auth.users with explicit ID
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      _user_id,
      '00000000-0000-0000-0000-000000000000',
      'mailto@kilimanjarogates.com',
      _encrypted_password,
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Admin User"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
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
    
    RAISE NOTICE 'Admin user created successfully with ID: %', _user_id;
  END IF;
END;
$$;

-- Execute the function to create the admin user
SELECT create_admin_user_with_auth();

-- Drop the function after use (for security)
DROP FUNCTION create_admin_user_with_auth();