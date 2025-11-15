import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";

interface RescheduleAppointmentDialogProps {
  appointmentId: string;
  currentDate?: string;
}

export const RescheduleAppointmentDialog = ({ appointmentId, currentDate }: RescheduleAppointmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const { updateAppointment } = useAppointments();

  const handleReschedule = async () => {
    if (!newDate) return;
    
    await updateAppointment.mutateAsync({
      id: appointmentId,
      scheduled_for: newDate,
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Reprogramar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprogramar Cita</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-date">Nueva Fecha y Hora</Label>
            <Input
              id="new-date"
              type="datetime-local"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleReschedule} disabled={!newDate || updateAppointment.isPending}>
              {updateAppointment.isPending ? "Reprogramando..." : "Confirmar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
