import { ReactNode } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Package, 
  Bell, 
  FileText, 
  Settings,
  PawPrint,
  LogOut,
  Heart,
  Stethoscope,
  ClipboardList,
  ShoppingBag
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "client" | "vet" | "admin";
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  
  const getNavigationItems = () => {
    switch (userRole) {
      case "client":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/client/dashboard" },
          { icon: Heart, label: "Mis Mascotas", path: "/client/mascotas" },
          { icon: Calendar, label: "Citas", path: "/client/citas" },
          { icon: ClipboardList, label: "Historial", path: "/client/historial" },
          { icon: ShoppingBag, label: "Mercadito", path: "/client/mercadito" },
          { icon: Bell, label: "Notificaciones", path: "/client/notificaciones" },
        ];
      case "vet":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/vet/dashboard" },
          { icon: Calendar, label: "Agenda", path: "/vet/agenda" },
          { icon: Stethoscope, label: "Consultas", path: "/vet/consultas" },
          { icon: Users, label: "Pacientes", path: "/vet/pacientes" },
          { icon: FileText, label: "Reportes", path: "/vet/reportes" },
        ];
      case "admin":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
          { icon: Users, label: "Usuarios", path: "/admin/usuarios" },
          { icon: Calendar, label: "Citas", path: "/admin/citas" },
          { icon: Package, label: "Inventario", path: "/admin/inventario" },
          { icon: FileText, label: "Ventas", path: "/admin/ventas" },
          { icon: Bell, label: "Notificaciones", path: "/admin/notificaciones" },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleLabel = () => {
    switch (userRole) {
      case "client":
        return "Cliente";
      case "vet":
        return "Veterinario";
      case "admin":
        return "Administrador";
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-sidebar-foreground" />
            <div>
              <span className="text-xl font-bold text-sidebar-foreground block">VetCare 360</span>
              <span className="text-xs text-sidebar-foreground/70">{getRoleLabel()}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Separator className="mb-4 bg-sidebar-border" />
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-sidebar-foreground/80 hover:bg-sidebar-accent"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
