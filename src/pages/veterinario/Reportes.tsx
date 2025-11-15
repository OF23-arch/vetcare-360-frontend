import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp, Users, Calendar, Download, FileText } from "lucide-react";

const Reportes = () => {
  const estadisticas = [
    {
      id: 1,
      titulo: "Total Consultas",
      valor: "156",
      cambio: "+12%",
      periodo: "Este mes",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      id: 2,
      titulo: "Pacientes Activos",
      valor: "89",
      cambio: "+8%",
      periodo: "Este mes",
      icon: Users,
      color: "text-green-500"
    },
    {
      id: 3,
      titulo: "Citas Programadas",
      valor: "34",
      cambio: "+5%",
      periodo: "Próxima semana",
      icon: Calendar,
      color: "text-purple-500"
    },
    {
      id: 4,
      titulo: "Tasa de Satisfacción",
      valor: "96%",
      cambio: "+3%",
      periodo: "Este mes",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ];

  const reportesDisponibles = [
    {
      id: 1,
      nombre: "Reporte Mensual de Consultas",
      descripcion: "Resumen de todas las consultas del mes",
      fecha: "Noviembre 2025"
    },
    {
      id: 2,
      nombre: "Estadísticas de Vacunación",
      descripcion: "Registro de vacunas aplicadas",
      fecha: "Noviembre 2025"
    },
    {
      id: 3,
      nombre: "Pacientes Nuevos",
      descripcion: "Lista de nuevos pacientes registrados",
      fecha: "Noviembre 2025"
    }
  ];

  return (
    <DashboardLayout userRole="vet">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">Analiza el desempeño de tu práctica veterinaria</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {estadisticas.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.titulo}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.valor}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">{stat.cambio}</span> vs {stat.periodo}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gráfica de Consultas</CardTitle>
                <CardDescription>Distribución mensual de consultas</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-12 w-12 mx-auto mb-2" />
                <p>Gráfica de estadísticas</p>
                <p className="text-sm">Los datos se mostrarían aquí</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">Reportes Disponibles</h2>
          <div className="grid gap-4">
            {reportesDisponibles.map((reporte) => (
              <Card key={reporte.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{reporte.nombre}</CardTitle>
                      <CardDescription>{reporte.descripcion}</CardDescription>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Período: {reporte.fecha}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reportes;
