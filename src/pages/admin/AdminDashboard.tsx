import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  Package, 
  TrendingUp, 
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">
            Resumen general de VetCare 360
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +18% este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas del Mes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos en Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-warning flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                15 productos bajo stock
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Actividad Reciente */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Actividad Reciente del Sistema</CardTitle>
              <CardDescription>Últimas acciones realizadas en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Nueva cita agendada</p>
                    <p className="text-xs text-muted-foreground">Juan Pérez agendó cita para Max - 15 Nov, 10:00 AM</p>
                    <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Nuevo usuario registrado</p>
                    <p className="text-xs text-muted-foreground">Ana López se registró como cliente</p>
                    <p className="text-xs text-muted-foreground">Hace 15 minutos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Actualización de inventario</p>
                    <p className="text-xs text-muted-foreground">Se agregaron 50 unidades de Vacuna Antirrábica</p>
                    <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Alerta de stock bajo</p>
                    <p className="text-xs text-muted-foreground">Desparasitante Canino tiene solo 8 unidades restantes</p>
                    <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Consulta completada</p>
                    <p className="text-xs text-muted-foreground">Dra. María González completó consulta de Rocky</p>
                    <p className="text-xs text-muted-foreground">Hace 3 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas Rápidas */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Métricas del Día</CardTitle>
              <CardDescription>Actividad en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Citas Hoy</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                </div>
                <Badge className="bg-success text-white">+8</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary/5 border border-secondary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Usuarios Activos</p>
                    <p className="text-2xl font-bold text-foreground">157</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Online
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ventas Hoy</p>
                    <p className="text-2xl font-bold text-foreground">$2,847</p>
                  </div>
                </div>
                <Badge className="bg-success text-white">+15%</Badge>
              </div>

              <div className="p-4 bg-gradient-primary rounded-lg text-white">
                <p className="text-sm opacity-90 mb-2">Veterinarios Activos</p>
                <p className="text-3xl font-bold mb-1">8 / 12</p>
                <p className="text-xs opacity-75">Disponibles ahora</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Alertas y Notificaciones del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <Package className="h-5 w-5 text-warning flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">15 productos con stock bajo</p>
                  <p className="text-sm text-muted-foreground">Revisar inventario y generar órdenes de compra</p>
                </div>
                <Button size="sm" variant="outline">Ver</Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-info/10 border border-primary/20 rounded-lg">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">3 citas sin confirmar</p>
                  <p className="text-sm text-muted-foreground">Citas programadas para mañana pendientes de confirmación</p>
                </div>
                <Button size="sm" variant="outline">Revisar</Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Sistema operando normalmente</p>
                  <p className="text-sm text-muted-foreground">Todos los servicios funcionando correctamente</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-info/10 border border-primary/20 rounded-lg">
                <Activity className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Respaldo programado</p>
                  <p className="text-sm text-muted-foreground">Próximo respaldo automático en 2 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Button className="h-24 bg-gradient-primary flex flex-col items-center justify-center gap-2">
            <Users className="h-6 w-6" />
            <span>Gestionar Usuarios</span>
          </Button>
          <Button className="h-24 bg-gradient-secondary flex flex-col items-center justify-center gap-2">
            <Calendar className="h-6 w-6" />
            <span>Ver Agenda General</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
            <Package className="h-6 w-6" />
            <span>Control de Inventario</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
            <Activity className="h-6 w-6" />
            <span>Generar Reportes</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
