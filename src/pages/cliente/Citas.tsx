import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { AddAppointmentDialog } from "@/components/appointments/AddAppointmentDialog";
import { RescheduleAppointmentDialog } from "@/components/appointments/RescheduleAppointmentDialog";
import { AppointmentDetailsDialog } from "@/components/appointments/AppointmentDetailsDialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Citas = () => {
  const { appointments, isLoading, updateAppointment } = useAppointments();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return "default";
      case "pendiente":
        return "secondary";
      case "completada":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleConfirm = async (id: string) => {
    await updateAppointment.mutateAsync({ id, status: "confirmada" });
  };

  const handleCancel = async (id: string) => {
    await updateAppointment.mutateAsync({ id, status: "cancelada" });
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="client">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando citas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis Citas</h1>
            <p className="text-muted-foreground">Gestiona tus citas veterinarias</p>
          </div>
          <AddAppointmentDialog />
        </div>

        {!appointments || appointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No tienes citas agendadas</p>
              <AddAppointmentDialog />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {appointments.map((cita) => (
              <Card key={cita.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {cita.pet?.name || "Mascota"}
                        <Badge variant={getEstadoColor(cita.status)}>
                          {cita.status.charAt(0).toUpperCase() + cita.status.slice(1)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {cita.type === "presencial" ? "Consulta Presencial" : "Teleconsulta"}
                      </CardDescription>
                    </div>
                    {cita.status === "pendiente" && (
                      <Button size="sm" onClick={() => handleConfirm(cita.id)}>
                        Confirmar
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground">Fecha</p>
                        <p className="font-medium">
                          {cita.scheduled_for
                            ? format(new Date(cita.scheduled_for), "dd MMM yyyy", { locale: es })
                            : "Por definir"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground">Hora</p>
                        <p className="font-medium">
                          {cita.scheduled_for
                            ? format(new Date(cita.scheduled_for), "HH:mm", { locale: es })
                            : "Por definir"}
                        </p>
                      </div>
                    </div>
                    {cita.vet && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-muted-foreground">Veterinario</p>
                          <p className="font-medium">{cita.vet.full_name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Motivo:</p>
                    <p className="text-sm">{cita.reason}</p>
                  </div>
                  {cita.status !== "completada" && cita.status !== "cancelada" && (
                    <div className="flex gap-2">
                      <RescheduleAppointmentDialog 
                        appointmentId={cita.id} 
                        currentDate={cita.scheduled_for || undefined}
                      />
                      <AppointmentDetailsDialog appointment={cita} />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCancel(cita.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Citas;
