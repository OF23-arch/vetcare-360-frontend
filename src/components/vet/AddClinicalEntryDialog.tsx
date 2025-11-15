import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface AddClinicalEntryDialogProps {
  appointmentId: string;
  petId: string;
}

export const AddClinicalEntryDialog = ({ appointmentId, petId }: AddClinicalEntryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    reason: "",
    diagnosis: "",
    treatment: "",
    prescriptions: "",
    weight: "",
    temperature: "",
    next_appointment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Obtener o crear registro clínico
      let { data: clinicalRecord } = await supabase
        .from("clinical_records")
        .select("id")
        .eq("pet_id", petId)
        .single();

      if (!clinicalRecord) {
        const { data: newRecord, error: recordError } = await supabase
          .from("clinical_records")
          .insert({ pet_id: petId })
          .select()
          .single();

        if (recordError) throw recordError;
        clinicalRecord = newRecord;
      }

      // Crear entrada clínica
      const { error: entryError } = await supabase
        .from("clinical_entries")
        .insert({
          record_id: clinicalRecord.id,
          vet_id: user!.id,
          reason: formData.reason,
          diagnosis: formData.diagnosis || null,
          treatment: formData.treatment || null,
          prescriptions: formData.prescriptions || null,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          temperature: formData.temperature ? parseFloat(formData.temperature) : null,
          next_appointment: formData.next_appointment || null,
        });

      if (entryError) throw entryError;

      // Actualizar cita a completada
      await supabase
        .from("appointments")
        .update({ status: "completada" })
        .eq("id", appointmentId);

      toast({
        title: "Registro médico guardado",
        description: "La atención médica se ha registrado exitosamente",
      });

      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["clinical-records"] });

      setOpen(false);
      setFormData({
        reason: "",
        diagnosis: "",
        treatment: "",
        prescriptions: "",
        weight: "",
        temperature: "",
        next_appointment: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el registro médico",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Registrar Atención
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Atención Médica</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Ej: 15.5"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperatura (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="Ej: 38.5"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo de Consulta *</Label>
            <Textarea
              id="reason"
              placeholder="Describe el motivo de la consulta"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnóstico</Label>
            <Textarea
              id="diagnosis"
              placeholder="Diagnóstico del veterinario"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Tratamiento</Label>
            <Textarea
              id="treatment"
              placeholder="Tratamiento recomendado"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prescriptions">Recetas y Medicamentos</Label>
            <Textarea
              id="prescriptions"
              placeholder="Lista de medicamentos prescritos"
              value={formData.prescriptions}
              onChange={(e) => setFormData({ ...formData, prescriptions: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next_appointment">Próxima Cita</Label>
            <Input
              id="next_appointment"
              type="date"
              value={formData.next_appointment}
              onChange={(e) => setFormData({ ...formData, next_appointment: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Registro"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
