import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, AlertCircle, Clock, PawPrint } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ClienteDashboard = () => {
  return (
    <DashboardLayout userRole="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido, Juan 👋
          </h1>
          <p className="text-muted-foreground">
            Aquí tienes un resumen de la salud de tus mascotas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Mascotas</CardTitle>
              <PawPrint className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">mascotas registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Nov</div>
              <p className="text-xs text-muted-foreground">10:00 AM - Control Max</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacunas Pendientes</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">requieren atención</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Visita</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 días</div>
              <p className="text-xs text-muted-foreground">Luna - Chequeo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mis Mascotas */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Mascotas</CardTitle>
              <CardDescription>Vista rápida de tus compañeros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <PawPrint className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Max</p>
                    <p className="text-sm text-muted-foreground">Golden Retriever • 3 años</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Saludable
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Luna</p>
                    <p className="text-sm text-muted-foreground">Gato Persa • 2 años</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Saludable
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <PawPrint className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Rocky</p>
                    <p className="text-sm text-muted-foreground">Bulldog • 5 años</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  Vacuna Pendiente
                </Badge>
              </div>

              <Button variant="outline" className="w-full">
                Ver Todas las Mascotas
              </Button>
            </CardContent>
          </Card>

          {/* Próximas Citas */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Citas</CardTitle>
              <CardDescription>Agenda y recordatorios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-lg flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-medium">NOV</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Control de Rutina - Max</p>
                  <p className="text-sm text-muted-foreground">10:00 AM • Dra. María González</p>
                  <p className="text-xs text-muted-foreground mt-1">Clínica Principal</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">NOV</span>
                  <span className="text-lg font-bold text-foreground">20</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Vacuna Antirrábica - Rocky</p>
                  <p className="text-sm text-muted-foreground">3:00 PM • Dr. Juan Rodríguez</p>
                  <p className="text-xs text-muted-foreground mt-1">Sucursal Norte</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">NOV</span>
                  <span className="text-lg font-bold text-foreground">25</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Chequeo Dental - Luna</p>
                  <p className="text-sm text-muted-foreground">11:30 AM • Dra. Ana Martínez</p>
                  <p className="text-xs text-muted-foreground mt-1">Clínica Principal</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                Agendar Nueva Cita
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Alertas y Recordatorios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Recordatorios Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Rocky necesita su vacuna antirrábica</p>
                <p className="text-sm text-muted-foreground">Vence el 20 de Noviembre</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-info/10 border border-primary/20 rounded-lg">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Cita de Max mañana a las 10:00 AM</p>
                <p className="text-sm text-muted-foreground">Recuerda llevar su cartilla de vacunación</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClienteDashboard;
