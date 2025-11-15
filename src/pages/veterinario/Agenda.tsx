import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, User } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Agenda = () => {
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

  const todayAppointments = appointments?.filter((apt) => {
    if (!apt.scheduled_for) return false;
    const aptDate = new Date(apt.scheduled_for);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  }) || [];

  if (isLoading) {
    return (
      <DashboardLayout userRole="vet">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando agenda...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="vet">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agenda del Día</h1>
            <p className="text-muted-foreground">
              {format(new Date(), "EEEE, d 'de' MMMM yyyy", { locale: es })}
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{todayAppointments.length}</CardTitle>
              <CardDescription>Citas Hoy</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {todayAppointments.filter(c => c.status === "confirmada").length}
              </CardTitle>
              <CardDescription>Confirmadas</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {todayAppointments.filter(c => c.status === "pendiente").length}
              </CardTitle>
              <CardDescription>Pendientes</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Citas Programadas</h2>
          {todayAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay citas programadas para hoy</p>
              </CardContent>
            </Card>
          ) : (
            todayAppointments.map((cita) => (
              <Card key={cita.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg p-3 min-w-[80px]">
                        <Clock className="h-5 w-5 mb-1" />
                        <span className="font-bold text-sm">
                          {cita.scheduled_for && format(new Date(cita.scheduled_for), "HH:mm")}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {cita.pet?.name || "Mascota"}
                          <Badge variant={getEstadoColor(cita.status)}>
                            {cita.status.charAt(0).toUpperCase() + cita.status.slice(1)}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <User className="h-3 w-3" />
                          {cita.client?.full_name || "Cliente"}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Tipo</p>
                      <p className="font-medium">
                        {cita.type === "presencial" ? "Presencial" : "Teleconsulta"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duración</p>
                      <p className="font-medium">30 min</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Motivo:</p>
                    <p className="text-sm">{cita.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Ver Detalles
                    </Button>
                    {cita.status === "pendiente" && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleConfirm(cita.id)}
                      >
                        Confirmar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Agenda;
