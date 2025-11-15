import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useClinicalRecords = () => {
  const { user, profile } = useAuth();

  const { data: records, isLoading } = useQuery({
    queryKey: ["clinical-records", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Para clientes, obtener registros de sus mascotas
      if (profile?.role === "client") {
        const { data, error } = await supabase
          .from("clinical_entries")
          .select(`
            *,
            record:clinical_records!inner(
              pet:pets!inner(
                name,
                owner_id
              )
            ),
            vet:profiles!clinical_entries_vet_id_fkey(full_name)
          `)
          .eq("record.pet.owner_id", user.id)
          .order("visit_date", { ascending: false });

        if (error) throw error;
        return data;
      }

      // Para veterinarios y admins, obtener todos los registros
      const { data, error } = await supabase
        .from("clinical_entries")
        .select(`
          *,
          record:clinical_records(
            pet:pets(
              name,
              owner_id,
              owner:profiles!pets_owner_id_fkey(full_name)
            )
          ),
          vet:profiles!clinical_entries_vet_id_fkey(full_name)
        `)
        .order("visit_date", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return {
    records,
    isLoading,
  };
};
