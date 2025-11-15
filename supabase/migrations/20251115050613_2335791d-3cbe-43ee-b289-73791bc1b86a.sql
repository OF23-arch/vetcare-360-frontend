-- Actualizar funciones con search_path seguro

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

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