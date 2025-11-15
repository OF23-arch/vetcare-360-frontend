import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Calendar, FileText } from "lucide-react";
import { usePets } from "@/hooks/usePets";
import { useState } from "react";
import { differenceInYears, differenceInMonths } from "date-fns";

const Pacientes = () => {
  const { pets, isLoading } = usePets();
  const [searchTerm, setSearchTerm] = useState("");

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return "Edad desconocida";
    const years = differenceInYears(new Date(), new Date(birthDate));
    const months = differenceInMonths(new Date(), new Date(birthDate)) % 12;
    
    if (years > 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    }
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  };

  const filteredPets = pets?.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout userRole="vet">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando pacientes...</p>
        </div>
      </DashboardLayout>
    );
  }

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
              placeholder="Buscar paciente..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        {!filteredPets || filteredPets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No se encontraron pacientes</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPets.map((paciente) => (
              <Card key={paciente.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {paciente.name}
                        <Badge variant="default">Activo</Badge>
                      </CardTitle>
                      <CardDescription>
                        {paciente.species} {paciente.breed && `- ${paciente.breed}`} - {calculateAge(paciente.birth_date)}
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
                          <span>Nombre del dueño</span>
                        </div>
                        {paciente.color && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Color:</span>
                            <span>{paciente.color}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Historial
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Cita
                      </Button>
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

export default Pacientes;
