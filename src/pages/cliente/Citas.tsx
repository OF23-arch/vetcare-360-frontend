import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, MapPin } from "lucide-react";

const Citas = () => {
  const citas = [
    {
      id: 1,
      mascota: "Max",
      tipo: "Consulta General",
      fecha: "15 Nov 2025",
      hora: "10:00 AM",
      veterinario: "Dr. García",
      estado: "Confirmada",
      ubicacion: "Consultorio 1"
    },
    {
      id: 2,
      mascota: "Luna",
      tipo: "Vacunación",
      fecha: "20 Nov 2025",
      hora: "3:00 PM",
      veterinario: "Dra. Martínez",
      estado: "Pendiente",
      ubicacion: "Consultorio 2"
    },
    {
      id: 3,
      mascota: "Max",
      tipo: "Control",
      fecha: "10 Nov 2025",
      hora: "11:30 AM",
      veterinario: "Dr. García",
      estado: "Completada",
      ubicacion: "Consultorio 1"
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Confirmada":
        return "default";
      case "Pendiente":
        return "secondary";
      case "Completada":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis Citas</h1>
            <p className="text-muted-foreground">Gestiona tus citas veterinarias</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Button>
        </div>

        <div className="grid gap-4">
          {citas.map((cita) => (
            <Card key={cita.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {cita.mascota}
                      <Badge variant={getEstadoColor(cita.estado)}>{cita.estado}</Badge>
                    </CardTitle>
                    <CardDescription>{cita.tipo}</CardDescription>
                  </div>
                  {cita.estado === "Pendiente" && (
                    <Button size="sm">Confirmar</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="font-medium">{cita.fecha}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Hora</p>
                      <p className="font-medium">{cita.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Ubicación</p>
                      <p className="font-medium">{cita.ubicacion}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Veterinario: <span className="font-medium text-foreground">{cita.veterinario}</span>
                  </p>
                  {cita.estado !== "Completada" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reprogramar</Button>
                      <Button variant="outline" size="sm">Cancelar</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Citas;
