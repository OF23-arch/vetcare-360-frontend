import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { usePets } from "@/hooks/usePets";
import { useAppointments } from "@/hooks/useAppointments";

export const CreateAppointmentDialog = () => {
  const [open, setOpen] = useState(false);
  const { pets } = usePets();
  const { createAppointment } = useAppointments();

  const [formData, setFormData] = useState({
    pet_id: "",
    reason: "",
    type: "presencial" as "presencial" | "teleconsulta",
    scheduled_for: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAppointment.mutateAsync(formData);
    setOpen(false);
    setFormData({
      pet_id: "",
      reason: "",
      type: "presencial",
      scheduled_for: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Cita
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Cita</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet">Mascota</Label>
            <Select value={formData.pet_id} onValueChange={(value) => setFormData({ ...formData, pet_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una mascota" />
              </SelectTrigger>
              <SelectContent>
                {pets?.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Consulta</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="teleconsulta">Teleconsulta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduled_for">Fecha y Hora</Label>
            <Input
              id="scheduled_for"
              type="datetime-local"
              value={formData.scheduled_for}
              onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Textarea
              id="reason"
              placeholder="Describe el motivo de la consulta"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createAppointment.isPending}>
              {createAppointment.isPending ? "Creando..." : "Crear Cita"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
