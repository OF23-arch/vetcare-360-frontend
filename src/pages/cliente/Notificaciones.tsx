import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, AlertCircle, CheckCircle, Info } from "lucide-react";

const Notificaciones = () => {
  const notificaciones = [
    {
      id: 1,
      tipo: "cita",
      titulo: "Recordatorio de Cita",
      mensaje: "Tienes una cita con Max mañana a las 10:00 AM",
      fecha: "Hoy",
      leido: false,
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      id: 2,
      tipo: "vacuna",
      titulo: "Vacuna Pendiente",
      mensaje: "Luna necesita su vacuna antirrábica el 20 de noviembre",
      fecha: "Hace 2 días",
      leido: false,
      icon: AlertCircle,
      color: "text-orange-500"
    },
    {
      id: 3,
      tipo: "confirmacion",
      titulo: "Cita Confirmada",
      mensaje: "Tu cita para Max ha sido confirmada exitosamente",
      fecha: "Hace 3 días",
      leido: true,
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 4,
      tipo: "info",
      titulo: "Consejos de Salud",
      mensaje: "Recuerda mantener la hidratación de tus mascotas durante el verano",
      fecha: "Hace 5 días",
      leido: true,
      icon: Info,
      color: "text-purple-500"
    }
  ];

  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notificaciones</h1>
            <p className="text-muted-foreground">Mantente al día con tus recordatorios</p>
          </div>
          <Button variant="outline">
            Marcar todas como leídas
          </Button>
        </div>

        <div className="grid gap-3">
          {notificaciones.map((notif) => {
            const Icon = notif.icon;
            return (
              <Card 
                key={notif.id} 
                className={`${!notif.leido ? 'border-primary/50 bg-primary/5' : ''} hover:shadow-md transition-shadow`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-muted ${notif.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{notif.titulo}</CardTitle>
                        <div className="flex items-center gap-2">
                          {!notif.leido && (
                            <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                          )}
                          <span className="text-xs text-muted-foreground">{notif.fecha}</span>
                        </div>
                      </div>
                      <CardDescription className="mt-1">
                        {notif.mensaje}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {notificaciones.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <CardTitle className="mb-2">No hay notificaciones</CardTitle>
              <CardDescription>
                Cuando tengas nuevas notificaciones, aparecerán aquí
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notificaciones;
