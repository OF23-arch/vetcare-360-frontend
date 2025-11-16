-- First, drop the policy that depends on the role column
DROP POLICY IF EXISTS "Vets can insert client profiles" ON public.profiles;

-- Remove role column from profiles table (roles should only be in user_roles)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Recreate the policy using has_role function instead
CREATE POLICY "Vets can insert client profiles"
ON public.profiles
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'vet'::app_role));

-- Update handle_new_user trigger to not insert role into profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Get role from raw_user_meta_data or use 'client' by default
  user_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::app_role,
    'client'::app_role
  );

  -- Insert profile WITHOUT role column
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- Insert role in user_roles (the only place roles should be stored)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  RETURN NEW;
END;
$$;