import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ClipboardCheck, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VeterinarioDashboard = () => {
  return (
    <DashboardLayout userRole="veterinario">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Buenos días, Dra. María 👋
          </h1>
          <p className="text-muted-foreground">
            Tienes 8 citas programadas para hoy
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">5 completadas, 3 pendientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+5 este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas del Mes</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio de Atención</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32 min</div>
              <p className="text-xs text-muted-foreground">por consulta</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Agenda del Día */}
          <Card>
            <CardHeader>
              <CardTitle>Agenda del Día</CardTitle>
              <CardDescription>Miércoles, 15 de Noviembre</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="w-16 text-center">
                  <p className="text-xs text-muted-foreground">Ahora</p>
                  <p className="font-bold text-primary">10:00</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">Max - Control de Rutina</p>
                    <Badge className="bg-primary text-white">En Curso</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Juan Pérez • Golden Retriever • 3 años</p>
                  <p className="text-xs text-muted-foreground mt-1">Sala 1</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-16 text-center">
                  <p className="font-bold text-foreground">10:30</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Mimi - Vacunación</p>
                  <p className="text-sm text-muted-foreground">Ana López • Gato Siamés • 1 año</p>
                  <p className="text-xs text-muted-foreground mt-1">Sala 2</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-16 text-center">
                  <p className="font-bold text-foreground">11:00</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Thor - Emergencia</p>
                  <p className="text-sm text-muted-foreground">Carlos Gómez • Pastor Alemán • 5 años</p>
                  <p className="text-xs text-muted-foreground mt-1">Sala 1</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-16 text-center">
                  <p className="font-bold text-foreground">11:30</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Luna - Chequeo Dental</p>
                  <p className="text-sm text-muted-foreground">María Torres • Gato Persa • 2 años</p>
                  <p className="text-xs text-muted-foreground mt-1">Sala 2</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>

          {/* Casos Recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Casos Recientes</CardTitle>
              <CardDescription>Historiales actualizados hoy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-foreground">Rocky - Revisión Post-Cirugía</p>
                    <p className="text-sm text-muted-foreground">Pedro Sánchez • Bulldog • 5 años</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Completado
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Evolución favorable después de cirugía de cadera. Se prescribe tratamiento...
                </p>
                <p className="text-xs text-muted-foreground">Hace 2 horas</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-foreground">Bella - Vacunación Múltiple</p>
                    <p className="text-sm text-muted-foreground">Laura Ramírez • Labrador • 8 meses</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Completado
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Aplicación de vacunas pentavalente y antirrábica. Próxima dosis en 30 días...
                </p>
                <p className="text-xs text-muted-foreground">Hace 3 horas</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-foreground">Simba - Control de Peso</p>
                    <p className="text-sm text-muted-foreground">Jorge Díaz • Gato Naranja • 4 años</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Completado
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Obesidad leve detectada. Se recomienda dieta baja en calorías y ejercicio...
                </p>
                <p className="text-xs text-muted-foreground">Hace 4 horas</p>
              </div>

              <Button className="w-full bg-gradient-primary">
                Registrar Nueva Consulta
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tareas Pendientes */}
        <Card>
          <CardHeader>
            <CardTitle>Tareas Pendientes</CardTitle>
            <CardDescription>Acciones que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <ClipboardCheck className="h-5 w-5 text-warning flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Completar historia clínica de Max</p>
                  <p className="text-sm text-muted-foreground">Faltan notas de la consulta de hoy</p>
                </div>
                <Button size="sm" variant="outline">Completar</Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-info/10 border border-primary/20 rounded-lg">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Revisar resultados de laboratorio</p>
                  <p className="text-sm text-muted-foreground">3 estudios pendientes de revisión</p>
                </div>
                <Button size="sm" variant="outline">Ver</Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-info/10 border border-primary/20 rounded-lg">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Confirmar citas de mañana</p>
                  <p className="text-sm text-muted-foreground">6 citas programadas para el jueves</p>
                </div>
                <Button size="sm" variant="outline">Confirmar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VeterinarioDashboard;
