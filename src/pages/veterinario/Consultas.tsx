import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Stethoscope, Search, FileText, Plus } from "lucide-react";

const Consultas = () => {
  const consultas = [
    {
      id: 1,
      paciente: "Max",
      dueno: "Juan Pérez",
      fecha: "15 Nov 2025",
      hora: "10:00 AM",
      motivo: "Revisión general",
      estado: "En curso",
      urgencia: "Normal"
    },
    {
      id: 2,
      paciente: "Luna",
      dueno: "María García",
      fecha: "15 Nov 2025",
      hora: "11:30 AM",
      motivo: "Vacunación",
      estado: "Programada",
      urgencia: "Normal"
    },
    {
      id: 3,
      paciente: "Rocky",
      dueno: "Carlos López",
      fecha: "15 Nov 2025",
      hora: "2:00 PM",
      motivo: "Cojera en pata trasera",
      estado: "Programada",
      urgencia: "Urgente"
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En curso":
        return "default";
      case "Programada":
        return "secondary";
      case "Completada":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getUrgenciaColor = (urgencia: string) => {
    return urgencia === "Urgente" ? "destructive" : "outline";
  };

  return (
    <DashboardLayout userRole="veterinario">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Consultas</h1>
            <p className="text-muted-foreground">Gestiona las consultas de tus pacientes</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Consulta
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por paciente o dueño..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        <div className="grid gap-4">
          {consultas.map((consulta) => (
            <Card key={consulta.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {consulta.paciente}
                        <Badge variant={getEstadoColor(consulta.estado)}>
                          {consulta.estado}
                        </Badge>
                        <Badge variant={getUrgenciaColor(consulta.urgencia)}>
                          {consulta.urgencia}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Dueño: {consulta.dueno}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fecha y Hora</p>
                      <p className="font-medium">{consulta.fecha} - {consulta.hora}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Motivo</p>
                      <p className="font-medium">{consulta.motivo}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {consulta.estado === "En curso" && (
                      <>
                        <Button size="sm" className="flex-1">
                          Continuar Consulta
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Historial
                        </Button>
                      </>
                    )}
                    {consulta.estado === "Programada" && (
                      <>
                        <Button size="sm" className="flex-1">
                          Iniciar Consulta
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                      </>
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

export default Consultas;
