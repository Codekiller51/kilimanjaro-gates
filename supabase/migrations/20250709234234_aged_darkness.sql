/*
  # Create admin user

  1. New Functions
    - Create function to set up admin user with specific credentials
  
  2. Security
    - Function is executed with security definer permissions
    - Only accessible by service role
*/

-- Function to create admin user with specific credentials
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO _user_id FROM auth.users WHERE email = 'mailto@kilimanjarogates.com';
  
  -- If user doesn't exist, create it
  IF _user_id IS NULL THEN
    -- Insert user into auth.users
    INSERT INTO auth.users (
      email,
      raw_user_meta_data,
      raw_app_meta_data,
      created_at,
      updated_at,
      email_confirmed_at
    ) VALUES (
      'mailto@kilimanjarogates.com',
      '{"full_name": "Admin User"}',
      '{"provider": "email", "providers": ["email"]}',
      now(),
      now(),
      now()
    )
    RETURNING id INTO _user_id;
    
    -- Set password (using auth.users_set_password function)
    PERFORM auth.users_set_password(_user_id, 'ABC123@kiligates.');
    
    -- Insert into profiles table with admin privileges
    INSERT INTO profiles (
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
    
    RAISE NOTICE 'Admin user created successfully';
  ELSE
    -- Update existing user to have admin privileges
    UPDATE profiles
    SET is_admin = true
    WHERE id = _user_id;
    
    RAISE NOTICE 'Existing user updated with admin privileges';
  END IF;
END;
$$;

-- Execute the function to create the admin user
SELECT create_admin_user();

-- Drop the function after use (optional, for security)
DROP FUNCTION create_admin_user();