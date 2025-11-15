import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Clock, User, Phone, FileText } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AppointmentDetailsDialogProps {
  appointment: any;
}

export const AppointmentDetailsDialog = ({ appointment }: AppointmentDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Ver Detalles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalles de la Cita</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Fecha</span>
              </div>
              <p className="text-sm">
                {appointment.scheduled_for
                  ? format(new Date(appointment.scheduled_for), "dd MMMM yyyy", { locale: es })
                  : "Por definir"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Hora</span>
              </div>
              <p className="text-sm">
                {appointment.scheduled_for
                  ? format(new Date(appointment.scheduled_for), "HH:mm", { locale: es })
                  : "Por definir"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium">Mascota</span>
            </div>
            <p className="text-sm">{appointment.pet?.name || "No especificado"}</p>
            <p className="text-xs text-muted-foreground">
              {appointment.pet?.species} {appointment.pet?.breed && `- ${appointment.pet.breed}`}
            </p>
          </div>

          {appointment.client && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">Cliente</span>
              </div>
              <p className="text-sm">{appointment.client.full_name}</p>
              {appointment.client.phone && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {appointment.client.phone}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Motivo</span>
            </div>
            <p className="text-sm">{appointment.reason}</p>
          </div>

          {appointment.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Notas</span>
              </div>
              <p className="text-sm">{appointment.notes}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Tipo de Consulta</span>
            </div>
            <p className="text-sm">
              {appointment.type === "presencial" ? "Consulta Presencial" : "Teleconsulta"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Estado</span>
            </div>
            <p className="text-sm capitalize">{appointment.status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
