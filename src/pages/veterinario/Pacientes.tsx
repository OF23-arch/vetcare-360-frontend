import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Calendar, FileText } from "lucide-react";

const Pacientes = () => {
  const pacientes = [
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      dueno: "Juan Pérez",
      telefono: "+52 123 456 7890",
      email: "juan@email.com",
      ultimaVisita: "10 Nov 2025",
      proximaCita: "15 Nov 2025",
      estado: "Activo"
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: "2 años",
      dueno: "María García",
      telefono: "+52 098 765 4321",
      email: "maria@email.com",
      ultimaVisita: "5 Nov 2025",
      proximaCita: "20 Nov 2025",
      estado: "Activo"
    },
    {
      id: 3,
      nombre: "Rocky",
      especie: "Perro",
      raza: "Pastor Alemán",
      edad: "5 años",
      dueno: "Carlos López",
      telefono: "+52 555 123 4567",
      email: "carlos@email.com",
      ultimaVisita: "1 Nov 2025",
      proximaCita: "15 Nov 2025",
      estado: "Tratamiento"
    }
  ];

  return (
    <DashboardLayout userRole="vet">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">Gestiona la información de tus pacientes</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar paciente o dueño..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        <div className="grid gap-4">
          {pacientes.map((paciente) => (
            <Card key={paciente.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {paciente.nombre}
                      <Badge variant={paciente.estado === "Activo" ? "default" : "secondary"}>
                        {paciente.estado}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {paciente.especie} - {paciente.raza} - {paciente.edad}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Información del Dueño</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{paciente.dueno}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{paciente.telefono}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{paciente.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                    <div>
                      <p className="text-muted-foreground">Última Visita</p>
                      <p className="font-medium">{paciente.ultimaVisita}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Próxima Cita</p>
                      <p className="font-medium">{paciente.proximaCita}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Historial
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Cita
                    </Button>
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

export default Pacientes;
