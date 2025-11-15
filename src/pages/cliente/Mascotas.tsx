import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Heart, Calendar, Activity } from "lucide-react";

const Mascotas = () => {
  const mascotas = [
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      peso: "28 kg",
      estado: "Saludable",
      proximaCita: "15 Nov 2025",
      foto: "🐕"
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: "2 años",
      peso: "4 kg",
      estado: "Vacunas pendientes",
      proximaCita: "20 Nov 2025",
      foto: "🐱"
    }
  ];

  return (
    <DashboardLayout userRole="cliente">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis Mascotas</h1>
            <p className="text-muted-foreground">Gestiona la información de tus mascotas</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Mascota
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mascotas.map((mascota) => (
            <Card key={mascota.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{mascota.foto}</div>
                    <div>
                      <CardTitle>{mascota.nombre}</CardTitle>
                      <CardDescription>{mascota.especie} - {mascota.raza}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={mascota.estado === "Saludable" ? "default" : "secondary"}>
                    {mascota.estado}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Edad</p>
                    <p className="font-medium">{mascota.edad}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Peso</p>
                    <p className="font-medium">{mascota.peso}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Próxima cita:</span>
                  <span className="font-medium">{mascota.proximaCita}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Activity className="h-4 w-4 mr-2" />
                    Ver Historial
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mascotas;
