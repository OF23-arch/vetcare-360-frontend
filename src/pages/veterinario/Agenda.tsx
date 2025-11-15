import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, User } from "lucide-react";

const Agenda = () => {
  const citas = [
    {
      id: 1,
      hora: "09:00 AM",
      paciente: "Max",
      dueno: "Juan Pérez",
      tipo: "Consulta General",
      duracion: "30 min",
      estado: "Confirmada"
    },
    {
      id: 2,
      hora: "10:00 AM",
      paciente: "Luna",
      dueno: "María García",
      tipo: "Vacunación",
      duracion: "20 min",
      estado: "Pendiente"
    },
    {
      id: 3,
      hora: "11:00 AM",
      paciente: "Rocky",
      dueno: "Carlos López",
      tipo: "Cirugía Menor",
      duracion: "60 min",
      estado: "Confirmada"
    },
    {
      id: 4,
      hora: "02:00 PM",
      paciente: "Mimi",
      dueno: "Ana Martínez",
      tipo: "Control",
      duracion: "30 min",
      estado: "Confirmada"
    }
  ];

  const getEstadoColor = (estado: string) => {
    return estado === "Confirmada" ? "default" : "secondary";
  };

  return (
    <DashboardLayout userRole="veterinario">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agenda del Día</h1>
            <p className="text-muted-foreground">Miércoles, 15 de Noviembre 2025</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{citas.length}</CardTitle>
              <CardDescription>Citas Hoy</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {citas.filter(c => c.estado === "Confirmada").length}
              </CardTitle>
              <CardDescription>Confirmadas</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {citas.filter(c => c.estado === "Pendiente").length}
              </CardTitle>
              <CardDescription>Pendientes</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Citas Programadas</h2>
          {citas.map((cita) => (
            <Card key={cita.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg p-3 min-w-[80px]">
                      <Clock className="h-5 w-5 mb-1" />
                      <span className="font-bold text-sm">{cita.hora}</span>
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {cita.paciente}
                        <Badge variant={getEstadoColor(cita.estado)}>{cita.estado}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="h-3 w-3" />
                        {cita.dueno}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tipo</p>
                      <p className="font-medium">{cita.tipo}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duración</p>
                      <p className="font-medium">{cita.duracion}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Ver Detalles</Button>
                    {cita.estado === "Pendiente" && (
                      <Button size="sm" variant="outline">Confirmar</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Agenda;
