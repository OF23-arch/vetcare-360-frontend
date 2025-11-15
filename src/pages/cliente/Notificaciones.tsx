import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Notificaciones = () => {
  const { appointments } = useAppointments();

  // Crear notificaciones basadas en citas
  const notifications = appointments
    ?.filter(apt => apt.status === "confirmada" || apt.status === "pendiente")
    .map(apt => ({
      id: apt.id,
      type: apt.status === "confirmada" ? "success" : "warning",
      title: apt.status === "confirmada" ? "Cita Confirmada" : "Cita Pendiente",
      message: `${apt.pet?.name} - ${apt.type === "presencial" ? "Consulta Presencial" : "Teleconsulta"}`,
      date: apt.scheduled_for || apt.requested_at,
      read: false,
    })) || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notificaciones</h1>
          <p className="text-muted-foreground">Mantente al día con tus citas y actualizaciones</p>
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tienes notificaciones nuevas</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div>
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {notification.message}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(notification.date), "dd MMM yyyy, HH:mm", { locale: es })}
                        </div>
                      </div>
                    </div>
                    {!notification.read && (
                      <Badge variant="secondary">Nueva</Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notificaciones;
