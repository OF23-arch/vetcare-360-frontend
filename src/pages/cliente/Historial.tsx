import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Syringe, Pill, Activity } from "lucide-react";

const Historial = () => {
  const historial = [
    {
      id: 1,
      mascota: "Max",
      tipo: "Consulta",
      fecha: "10 Nov 2025",
      veterinario: "Dr. García",
      diagnostico: "Revisión general - Estado saludable",
      tratamiento: "Ninguno requerido",
      icon: Activity,
      color: "text-blue-500"
    },
    {
      id: 2,
      mascota: "Luna",
      tipo: "Vacunación",
      fecha: "5 Nov 2025",
      veterinario: "Dra. Martínez",
      diagnostico: "Aplicación de vacuna antirrábica",
      tratamiento: "Próxima dosis en 1 año",
      icon: Syringe,
      color: "text-green-500"
    },
    {
      id: 3,
      mascota: "Max",
      tipo: "Tratamiento",
      fecha: "28 Oct 2025",
      veterinario: "Dr. García",
      diagnostico: "Infección leve en pata",
      tratamiento: "Antibióticos por 7 días",
      icon: Pill,
      color: "text-orange-500"
    }
  ];

  return (
    <DashboardLayout userRole="cliente">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historial Médico</h1>
          <p className="text-muted-foreground">Consulta el historial médico de tus mascotas</p>
        </div>

        <div className="grid gap-4">
          {historial.map((registro) => {
            const Icon = registro.icon;
            return (
              <Card key={registro.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-muted ${registro.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle>{registro.mascota}</CardTitle>
                        <Badge variant="outline">{registro.fecha}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <FileText className="h-3 w-3" />
                        {registro.tipo}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Veterinario</p>
                    <p className="text-sm">{registro.veterinario}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Diagnóstico</p>
                    <p className="text-sm">{registro.diagnostico}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tratamiento</p>
                    <p className="text-sm">{registro.tratamiento}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Historial;
