import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Activity } from "lucide-react";
import { usePets } from "@/hooks/usePets";
import { AddPetDialog } from "@/components/pets/AddPetDialog";
import { useNavigate } from "react-router-dom";

const Mascotas = () => {
  const { pets, isLoading } = usePets();
  const navigate = useNavigate();

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} meses`;
    }
    return `${years} años`;
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="client">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando mascotas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis Mascotas</h1>
            <p className="text-muted-foreground">Gestiona la información de tus mascotas</p>
          </div>
          <AddPetDialog />
        </div>

        {!pets || pets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No tienes mascotas registradas</p>
              <AddPetDialog />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {pets.map((mascota) => (
              <Card key={mascota.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">
                        {mascota.species === "Perro" ? "🐕" : mascota.species === "Gato" ? "🐱" : "🐾"}
                      </div>
                      <div>
                        <CardTitle>{mascota.name}</CardTitle>
                        <CardDescription>{mascota.species} {mascota.breed ? `- ${mascota.breed}` : ""}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Activo</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Edad</p>
                      <p className="font-medium">{calculateAge(mascota.birth_date)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sexo</p>
                      <p className="font-medium">{mascota.sex || "N/A"}</p>
                    </div>
                  </div>

                  {mascota.color && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Color</p>
                      <p className="font-medium">{mascota.color}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate("/client/historial")}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Ver Historial
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate("/client/citas")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Cita
                    </Button>
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

export default Mascotas;
