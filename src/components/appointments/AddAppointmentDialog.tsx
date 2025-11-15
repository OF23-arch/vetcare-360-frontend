import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { usePets } from "@/hooks/usePets";

export const AddAppointmentDialog = () => {
  const [open, setOpen] = useState(false);
  const { createAppointment } = useAppointments();
  const { pets } = usePets();
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Solicitar Nueva Cita</DialogTitle>
            <DialogDescription>
              Completa la información para solicitar una cita
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pet_id">Mascota *</Label>
              <Select
                value={formData.pet_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, pet_id: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar mascota" />
                </SelectTrigger>
                <SelectContent>
                  {pets?.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} - {pet.species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Consulta *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "presencial" | "teleconsulta") =>
                  setFormData({ ...formData, type: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="teleconsulta">Teleconsulta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scheduled_for">Fecha Preferida</Label>
              <Input
                id="scheduled_for"
                type="datetime-local"
                value={formData.scheduled_for}
                onChange={(e) =>
                  setFormData({ ...formData, scheduled_for: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Motivo de la Consulta *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                required
                placeholder="Describe el motivo de la consulta"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createAppointment.isPending}>
              {createAppointment.isPending ? "Enviando..." : "Solicitar Cita"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
