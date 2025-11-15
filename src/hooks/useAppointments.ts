import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export const useAppointments = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      let query = supabase
        .from("appointments")
        .select(`
          *,
          pet:pets(*),
          client:profiles!appointments_client_id_fkey(*),
          vet:profiles!appointments_vet_id_fkey(*)
        `)
        .order("requested_at", { ascending: false });

      // Filter based on role
      if (profile?.role === "client") {
        query = query.eq("client_id", user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createAppointment = useMutation({
    mutationFn: async (appointmentData: {
      pet_id: string;
      reason: string;
      type: "presencial" | "teleconsulta";
      scheduled_for?: string;
    }) => {
      if (!user?.id) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          ...appointmentData,
          client_id: user.id,
          status: "pendiente",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({
        title: "Cita solicitada",
        description: "Tu solicitud de cita ha sido enviada",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo crear la cita",
        variant: "destructive",
      });
    },
  });

  const updateAppointment = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      status?: "pendiente" | "confirmada" | "cancelada" | "completada";
      scheduled_for?: string;
      vet_id?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({
        title: "Cita actualizada",
        description: "La cita se ha actualizado exitosamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la cita",
        variant: "destructive",
      });
    },
  });

  return {
    appointments,
    isLoading,
    createAppointment,
    updateAppointment,
  };
};
