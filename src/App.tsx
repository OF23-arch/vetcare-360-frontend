import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import ClienteDashboard from "./pages/cliente/ClienteDashboard";
import Mascotas from "./pages/cliente/Mascotas";
import ClienteCitas from "./pages/cliente/Citas";
import Historial from "./pages/cliente/Historial";
import ClienteNotificaciones from "./pages/cliente/Notificaciones";
import VeterinarioDashboard from "./pages/veterinario/VeterinarioDashboard";
import Agenda from "./pages/veterinario/Agenda";
import Consultas from "./pages/veterinario/Consultas";
import Pacientes from "./pages/veterinario/Pacientes";
import Reportes from "./pages/veterinario/Reportes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GestionUsuarios from "./pages/admin/GestionUsuarios";
import Inventario from "./pages/admin/Inventario";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Cliente Routes */}
          <Route path="/client/dashboard" element={<ProtectedRoute allowedRoles={['client']}><ClienteDashboard /></ProtectedRoute>} />
          <Route path="/client/mascotas" element={<ProtectedRoute allowedRoles={['client']}><Mascotas /></ProtectedRoute>} />
          <Route path="/client/citas" element={<ProtectedRoute allowedRoles={['client']}><ClienteCitas /></ProtectedRoute>} />
          <Route path="/client/historial" element={<ProtectedRoute allowedRoles={['client']}><Historial /></ProtectedRoute>} />
          <Route path="/client/notificaciones" element={<ProtectedRoute allowedRoles={['client']}><ClienteNotificaciones /></ProtectedRoute>} />
          
          {/* Veterinario Routes */}
          <Route path="/vet/dashboard" element={<ProtectedRoute allowedRoles={['vet']}><VeterinarioDashboard /></ProtectedRoute>} />
          <Route path="/vet/agenda" element={<ProtectedRoute allowedRoles={['vet']}><Agenda /></ProtectedRoute>} />
          <Route path="/vet/consultas" element={<ProtectedRoute allowedRoles={['vet']}><Consultas /></ProtectedRoute>} />
          <Route path="/vet/pacientes" element={<ProtectedRoute allowedRoles={['vet']}><Pacientes /></ProtectedRoute>} />
          <Route path="/vet/reportes" element={<ProtectedRoute allowedRoles={['vet']}><Reportes /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/usuarios" element={<ProtectedRoute allowedRoles={['admin']}><GestionUsuarios /></ProtectedRoute>} />
          <Route path="/admin/inventario" element={<ProtectedRoute allowedRoles={['admin']}><Inventario /></ProtectedRoute>} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
