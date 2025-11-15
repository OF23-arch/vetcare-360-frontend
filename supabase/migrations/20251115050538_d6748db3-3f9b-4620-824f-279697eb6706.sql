-- Crear enum para roles de usuario
CREATE TYPE public.app_role AS ENUM ('admin', 'vet', 'client');

-- Crear enum para tipo de cita
CREATE TYPE public.appointment_type AS ENUM ('presencial', 'teleconsulta');

-- Crear enum para estado de cita
CREATE TYPE public.appointment_status AS ENUM ('pendiente', 'confirmada', 'cancelada', 'completada');

-- Crear enum para estado de pago
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'cancelled');

-- Crear enum para tipo de movimiento de inventario
CREATE TYPE public.movement_type AS ENUM ('IN', 'OUT', 'ADJUST');

-- Crear enum para categoría de producto
CREATE TYPE public.product_category AS ENUM ('alimentos', 'medicamentos', 'accesorios', 'higiene', 'juguetes', 'otros');

-- Tabla de perfiles de usuario
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role app_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de roles de usuario (separada para seguridad)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Función de seguridad para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Tabla de mascotas
CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  sex TEXT,
  color TEXT,
  birth_date DATE,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de historias clínicas (una por mascota)
CREATE TABLE public.clinical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL UNIQUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de entradas de historia clínica (consultas)
CREATE TABLE public.clinical_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id UUID REFERENCES public.clinical_records(id) ON DELETE CASCADE NOT NULL,
  vet_id UUID REFERENCES public.profiles(id) NOT NULL,
  visit_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  reason TEXT NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  prescriptions TEXT,
  weight NUMERIC(5,2),
  temperature NUMERIC(4,2),
  next_appointment DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de citas
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  vet_id UUID REFERENCES public.profiles(id),
  type appointment_type NOT NULL DEFAULT 'presencial',
  status appointment_status NOT NULL DEFAULT 'pendiente',
  reason TEXT NOT NULL,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  scheduled_for TIMESTAMPTZ,
  teleconference_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de productos (inventario)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER NOT NULL DEFAULT 10,
  category product_category NOT NULL DEFAULT 'otros',
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de movimientos de inventario
CREATE TABLE public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  movement_type movement_type NOT NULL,
  reason TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de ventas
CREATE TABLE public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.profiles(id),
  total NUMERIC(10,2) NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de items de venta
CREATE TABLE public.sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES public.sales(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de carritos (para el mercadito)
CREATE TABLE public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de items del carrito
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES public.carts(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(cart_id, product_id)
);

-- TRIGGERS --

-- Trigger para actualizar updated_at en profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clinical_records_updated_at
  BEFORE UPDATE ON public.clinical_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para crear historia clínica al crear mascota
CREATE OR REPLACE FUNCTION public.create_clinical_record_for_pet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.clinical_records (pet_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER create_clinical_record_after_pet
  AFTER INSERT ON public.pets
  FOR EACH ROW
  EXECUTE FUNCTION public.create_clinical_record_for_pet();

-- Trigger para actualizar stock al crear venta
CREATE OR REPLACE FUNCTION public.update_stock_on_sale()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Actualizar stock del producto
  UPDATE public.products
  SET stock = stock - NEW.quantity
  WHERE id = NEW.product_id;
  
  -- Registrar movimiento de inventario
  INSERT INTO public.inventory_movements (product_id, quantity, movement_type, reason)
  VALUES (NEW.product_id, NEW.quantity, 'OUT', 'Venta #' || NEW.sale_id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_stock_after_sale_item
  AFTER INSERT ON public.sale_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_stock_on_sale();

-- Trigger para crear carrito al crear perfil de cliente
CREATE OR REPLACE FUNCTION public.create_cart_for_client()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'client' THEN
    INSERT INTO public.carts (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER create_cart_after_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_cart_for_client();

-- ROW LEVEL SECURITY --

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Vets can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Vets can insert client profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'vet') AND role = 'client');

-- Policies para user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies para pets
CREATE POLICY "Clients can view their own pets"
  ON public.pets FOR SELECT
  USING (owner_id = auth.uid());

CREATE POLICY "Clients can insert their own pets"
  ON public.pets FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Clients can update their own pets"
  ON public.pets FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Vets can view all pets"
  ON public.pets FOR SELECT
  USING (public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Admins can view all pets"
  ON public.pets FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies para clinical_records
CREATE POLICY "Clients can view their pets' records"
  ON public.clinical_records FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = clinical_records.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Vets can view all records"
  ON public.clinical_records FOR SELECT
  USING (public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Admins can view all records"
  ON public.clinical_records FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies para clinical_entries
CREATE POLICY "Clients can view their pets' entries"
  ON public.clinical_entries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.clinical_records
      JOIN public.pets ON pets.id = clinical_records.pet_id
      WHERE clinical_records.id = clinical_entries.record_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Vets can view all entries"
  ON public.clinical_entries FOR SELECT
  USING (public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Vets can insert entries"
  ON public.clinical_entries FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'vet') AND vet_id = auth.uid());

CREATE POLICY "Vets can update their own entries"
  ON public.clinical_entries FOR UPDATE
  USING (public.has_role(auth.uid(), 'vet') AND vet_id = auth.uid());

CREATE POLICY "Admins can view all entries"
  ON public.clinical_entries FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies para appointments
CREATE POLICY "Clients can view their own appointments"
  ON public.appointments FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Clients can insert appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their pending appointments"
  ON public.appointments FOR UPDATE
  USING (client_id = auth.uid() AND status = 'pendiente');

CREATE POLICY "Vets can view all appointments"
  ON public.appointments FOR SELECT
  USING (public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Vets can update appointments"
  ON public.appointments FOR UPDATE
  USING (public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Admins can view all appointments"
  ON public.appointments FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies para products (todos pueden ver productos)
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies para inventory_movements
CREATE POLICY "Admins can view inventory movements"
  ON public.inventory_movements FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert inventory movements"
  ON public.inventory_movements FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policies para sales
CREATE POLICY "Clients can view their own sales"
  ON public.sales FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Admins can view all sales"
  ON public.sales FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert sales"
  ON public.sales FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'vet'));

CREATE POLICY "Clients can insert their own sales"
  ON public.sales FOR INSERT
  WITH CHECK (customer_id = auth.uid());

-- Policies para sale_items
CREATE POLICY "Users can view sale items of their sales"
  ON public.sale_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sales
      WHERE sales.id = sale_items.sale_id
      AND (sales.customer_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Admins can insert sale items"
  ON public.sale_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sales
      WHERE sales.id = sale_items.sale_id
      AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'vet'))
    )
  );

-- Policies para carts
CREATE POLICY "Users can view their own cart"
  ON public.carts FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own cart"
  ON public.carts FOR UPDATE
  USING (user_id = auth.uid());

-- Policies para cart_items
CREATE POLICY "Users can manage their cart items"
  ON public.cart_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

-- Crear índices para mejorar performance
CREATE INDEX idx_pets_owner_id ON public.pets(owner_id);
CREATE INDEX idx_clinical_entries_record_id ON public.clinical_entries(record_id);
CREATE INDEX idx_clinical_entries_vet_id ON public.clinical_entries(vet_id);
CREATE INDEX idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX idx_appointments_vet_id ON public.appointments(vet_id);
CREATE INDEX idx_appointments_scheduled_for ON public.appointments(scheduled_for);
CREATE INDEX idx_sale_items_sale_id ON public.sale_items(sale_id);
CREATE INDEX idx_sale_items_product_id ON public.sale_items(product_id);
CREATE INDEX idx_inventory_movements_product_id ON public.inventory_movements(product_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);