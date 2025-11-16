import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useProfiles = () => {
  const queryClient = useQueryClient();

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, user_roles!inner(role)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform data to include role
      return data.map((profile) => {
        const userRoles = profile.user_roles as unknown as Array<{ role: 'admin' | 'vet' | 'client' }>;
        return {
          id: profile.id,
          full_name: profile.full_name,
          phone: profile.phone,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
          role: userRoles[0].role
        };
      });
    },
  });

  const updateProfile = useMutation({
    mutationFn: async ({
      id,
      role,
      ...updates
    }: {
      id: string;
      full_name?: string;
      phone?: string;
      role?: "admin" | "vet" | "client";
    }) => {
      // Update profile data (without role)
      const { error: profileError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id);

      if (profileError) throw profileError;

      // Update role in user_roles table if provided
      if (role) {
        const { error: roleError } = await supabase
          .from("user_roles")
          .update({ role })
          .eq("user_id", id);

        if (roleError) throw roleError;
      }

      return { id, ...updates, role };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast({
        title: "Usuario actualizado",
        description: "Los datos se han actualizado exitosamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el usuario",
        variant: "destructive",
      });
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const [profilesCount, appointmentsCount, petsCount] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("appointments").select("*", { count: "exact", head: true }),
        supabase.from("pets").select("*", { count: "exact", head: true }),
      ]);

      return {
        totalUsers: profilesCount.count || 0,
        totalAppointments: appointmentsCount.count || 0,
        totalPets: petsCount.count || 0,
      };
    },
  });

  return {
    profiles,
    isLoading,
    updateProfile,
    stats,
  };
};
