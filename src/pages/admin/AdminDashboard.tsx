import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  PawPrint,
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProfiles } from "@/hooks/useProfiles";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AdminDashboard = () => {
  const { profiles, stats, isLoading } = useProfiles();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Cargando dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                Usuarios registrados en el sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAppointments || 0}</div>
              <p className="text-xs text-muted-foreground">
                Citas programadas en el sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mascotas</CardTitle>
              <PawPrint className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalPets || 0}</div>
              <p className="text-xs text-muted-foreground">
                Mascotas registradas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Usuarios Recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Usuarios Recientes</CardTitle>
              <CardDescription>Últimos usuarios registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profiles?.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.role === "admin" ? "Administrador" : user.role === "vet" ? "Veterinario" : "Cliente"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {format(new Date(user.created_at), "dd MMM", { locale: es })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gestión Rápida */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión Rápida</CardTitle>
              <CardDescription>Acciones administrativas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/usuarios")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar Usuarios
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/citas")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Todas las Citas
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/inventario")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Gestionar Inventario
                </Button>
                <Button
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/mascotas")}
                >
                  <PawPrint className="h-4 w-4 mr-2" />
                  Ver Todas las Mascotas
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/reportes")}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Reportes y Estadísticas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribución de Roles */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Usuarios por Rol</CardTitle>
            <CardDescription>Vista general de los tipos de usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Administradores</span>
                  <Badge variant="default">Admin</Badge>
                </div>
                <p className="text-2xl font-bold">
                  {profiles?.filter(p => p.role === "admin").length || 0}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Veterinarios</span>
                  <Badge variant="secondary">Vet</Badge>
                </div>
                <p className="text-2xl font-bold">
                  {profiles?.filter(p => p.role === "vet").length || 0}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Clientes</span>
                  <Badge variant="outline">Client</Badge>
                </div>
                <p className="text-2xl font-bold">
                  {profiles?.filter(p => p.role === "client").length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
