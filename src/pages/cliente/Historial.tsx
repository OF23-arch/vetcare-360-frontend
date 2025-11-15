import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Stethoscope } from "lucide-react";
import { useClinicalRecords } from "@/hooks/useClinicalRecords";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Historial = () => {
  const { records, isLoading } = useClinicalRecords();

  if (isLoading) {
    return (
      <DashboardLayout userRole="client">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando historial...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historial Médico</h1>
          <p className="text-muted-foreground">Consulta el historial médico de tus mascotas</p>
        </div>

        {!records || records.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay registros médicos disponibles</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {records.map((registro) => (
              <Card key={registro.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          {registro.record?.pet?.name || "Mascota"}
                        </CardTitle>
                        <Badge variant="outline">
                          {format(new Date(registro.visit_date), "dd MMM yyyy", { locale: es })}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <FileText className="h-3 w-3" />
                        Consulta Veterinaria
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Veterinario</p>
                    <p className="text-sm">{registro.vet?.full_name || "No especificado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Motivo</p>
                    <p className="text-sm">{registro.reason}</p>
                  </div>
                  {registro.diagnosis && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Diagnóstico</p>
                      <p className="text-sm">{registro.diagnosis}</p>
                    </div>
                  )}
                  {registro.treatment && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tratamiento</p>
                      <p className="text-sm">{registro.treatment}</p>
                    </div>
                  )}
                  {registro.prescriptions && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Recetas</p>
                      <p className="text-sm">{registro.prescriptions}</p>
                    </div>
                  )}
                  {(registro.weight || registro.temperature) && (
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      {registro.weight && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Peso</p>
                          <p className="text-sm">{registro.weight} kg</p>
                        </div>
                      )}
                      {registro.temperature && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Temperatura</p>
                          <p className="text-sm">{registro.temperature} °C</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Historial;
