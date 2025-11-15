import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
          <Route path="/client/dashboard" element={<ClienteDashboard />} />
          <Route path="/client/mascotas" element={<Mascotas />} />
          <Route path="/client/citas" element={<ClienteCitas />} />
          <Route path="/client/historial" element={<Historial />} />
          <Route path="/client/notificaciones" element={<ClienteNotificaciones />} />
          
          {/* Veterinario Routes */}
          <Route path="/vet/dashboard" element={<VeterinarioDashboard />} />
          <Route path="/vet/agenda" element={<Agenda />} />
          <Route path="/vet/consultas" element={<Consultas />} />
          <Route path="/vet/pacientes" element={<Pacientes />} />
          <Route path="/vet/reportes" element={<Reportes />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
