import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Stethoscope, Search, FileText, Plus } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Consultas = () => {
  const { appointments, isLoading, updateAppointment } = useAppointments();
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleComplete = async (id: string) => {
    await updateAppointment.mutateAsync({ id, status: "completada" });
  };

  const filteredAppointments = appointments?.filter((apt) =>
    apt.pet?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.client?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout userRole="vet">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando consultas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="vet">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        {!filteredAppointments || filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No hay consultas registradas</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredAppointments.map((consulta) => (
              <Card key={consulta.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Stethoscope className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {consulta.pet?.name || "Mascota"}
                          <Badge variant={getEstadoColor(consulta.status)}>
                            {consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1)}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Dueño: {consulta.client?.full_name || "Cliente"}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Fecha y Hora</p>
                        <p className="font-medium">
                          {consulta.scheduled_for 
                            ? format(new Date(consulta.scheduled_for), "dd MMM yyyy - HH:mm", { locale: es })
                            : "Por definir"
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tipo</p>
                        <p className="font-medium">
                          {consulta.type === "presencial" ? "Presencial" : "Teleconsulta"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Motivo de la Consulta</p>
                      <p className="text-sm font-medium">{consulta.reason}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t">
                      {consulta.status === "confirmada" && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Expediente
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleComplete(consulta.id)}
                          >
                            Completar Consulta
                          </Button>
                        </>
                      )}
                      {consulta.status === "completada" && (
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Consultas;
