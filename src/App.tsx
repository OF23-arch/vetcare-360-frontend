import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Cliente Routes */}
          <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
          <Route path="/cliente/mascotas" element={<Mascotas />} />
          <Route path="/cliente/citas" element={<ClienteCitas />} />
          <Route path="/cliente/historial" element={<Historial />} />
          <Route path="/cliente/notificaciones" element={<ClienteNotificaciones />} />
          
          {/* Veterinario Routes */}
          <Route path="/veterinario/dashboard" element={<VeterinarioDashboard />} />
          <Route path="/veterinario/agenda" element={<Agenda />} />
          <Route path="/veterinario/consultas" element={<Consultas />} />
          <Route path="/veterinario/pacientes" element={<Pacientes />} />
          <Route path="/veterinario/reportes" element={<Reportes />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
