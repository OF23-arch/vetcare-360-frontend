import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export const usePets = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: pets, isLoading } = useQuery({
    queryKey: ["pets", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createPet = useMutation({
    mutationFn: async (petData: {
      name: string;
      species: string;
      breed?: string;
      sex?: string;
      birth_date?: string;
      color?: string;
    }) => {
      if (!user?.id) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from("pets")
        .insert({ ...petData, owner_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast({
        title: "Mascota registrada",
        description: "La mascota se ha registrado exitosamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo registrar la mascota",
        variant: "destructive",
      });
    },
  });

  const updatePet = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      name?: string;
      species?: string;
      breed?: string;
      sex?: string;
      birth_date?: string;
      color?: string;
    }) => {
      const { data, error } = await supabase
        .from("pets")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast({
        title: "Mascota actualizada",
        description: "Los datos se han actualizado exitosamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la mascota",
        variant: "destructive",
      });
    },
  });

  const deletePet = useMutation({
    mutationFn: async (id: string) => {
      // Verificar que no tenga citas activas
      const { data: appointments } = await supabase
        .from("appointments")
        .select("id")
        .eq("pet_id", id)
        .in("status", ["pendiente", "confirmada"]);

      if (appointments && appointments.length > 0) {
        throw new Error("No se puede eliminar una mascota con citas activas");
      }

      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast({
        title: "Mascota eliminada",
        description: "La mascota se ha eliminado exitosamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la mascota",
        variant: "destructive",
      });
    },
  });

  return {
    pets,
    isLoading,
    createPet,
    updatePet,
    deletePet,
  };
};
