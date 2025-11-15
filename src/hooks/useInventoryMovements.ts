import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type InventoryMovement = {
  id: string;
  product_id: string;
  quantity: number;
  movement_type: "IN" | "OUT";
  reason: string | null;
  created_by: string | null;
  created_at: string;
};

export type MovementInsert = {
  product_id: string;
  quantity: number;
  movement_type: "IN" | "OUT";
  reason?: string;
};

export const useInventoryMovements = (productId?: string) => {
  const queryClient = useQueryClient();

  const { data: movements = [], isLoading } = useQuery({
    queryKey: ["inventory-movements", productId],
    queryFn: async () => {
      let query = supabase
        .from("inventory_movements")
        .select("*")
        .order("created_at", { ascending: false });

      if (productId) {
        query = query.eq("product_id", productId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as InventoryMovement[];
    },
  });

  const createMovement = useMutation({
    mutationFn: async (movement: MovementInsert) => {
      // Obtener el producto actual para validar stock
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("stock, name")
        .eq("id", movement.product_id)
        .single();

      if (productError) throw productError;

      // Validar que no haya stock negativo en salidas
      if (movement.movement_type === "OUT" && product.stock < movement.quantity) {
        throw new Error(`Stock insuficiente. Stock actual de ${product.name}: ${product.stock}`);
      }

      // Obtener usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      // Insertar movimiento
      const { data, error } = await supabase
        .from("inventory_movements")
        .insert({
          ...movement,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Actualizar stock del producto
      const newStock = movement.movement_type === "IN" 
        ? product.stock + movement.quantity 
        : product.stock - movement.quantity;

      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", movement.product_id);

      if (updateError) throw updateError;

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inventory-movements"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      const type = variables.movement_type === "IN" ? "Entrada" : "Salida";
      toast.success(`${type} registrada exitosamente`);
    },
    onError: (error: Error) => {
      toast.error("Error: " + error.message);
    },
  });

  return {
    movements,
    isLoading,
    createMovement,
  };
};
