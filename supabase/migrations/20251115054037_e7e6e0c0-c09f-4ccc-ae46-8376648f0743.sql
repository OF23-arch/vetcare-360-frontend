-- Crear función para manejar nuevos usuarios de Google OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insertar perfil con rol de cliente por defecto
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'phone',
    'client'
  );
  
  -- Insertar rol en user_roles
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');
  
  RETURN NEW;
END;
$$;

-- Crear trigger para ejecutar la función cuando se crea un nuevo usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Actualizar política RLS para permitir que el trigger inserte perfiles
DROP POLICY IF EXISTS "Enable insert for authenticated users during signup" ON public.profiles;
CREATE POLICY "Enable insert for authenticated users during signup"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);