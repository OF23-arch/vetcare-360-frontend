import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, ClipboardList, Bell, Shield, Users, CheckCircle, ArrowRight, Stethoscope, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
const Landing = () => {
  return <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">VetCare 360</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#caracteristicas" className="text-muted-foreground hover:text-primary transition-colors">
              Características
            </a>
            <a href="#testimonios" className="text-muted-foreground hover:text-primary transition-colors">
              Testimonios
            </a>
            <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>
          <div className="flex gap-3">
            <Link to="/auth">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary">Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Cuidado Integral para tus Mascotas</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Gestión Veterinaria
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Simple y Profesional
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            La plataforma completa para clínicas veterinarias modernas. 
            Agenda citas, gestiona historiales clínicos y mantén el control 
            de tu inventario en un solo lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-lg px-8">
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-muted-foreground">Clientes Activos</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">10k+</h3>
              <p className="text-muted-foreground">Citas Gestionadas</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">98%</h3>
              <p className="text-muted-foreground">Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tu clínica veterinaria de manera eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Agenda Digital
                </h3>
                <p className="text-muted-foreground">
                  Sistema inteligente de citas con recordatorios automáticos y gestión de disponibilidad
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Historial Clínico
                </h3>
                <p className="text-muted-foreground">
                  Registro completo de consultas, diagnósticos y tratamientos de cada mascota
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Notificaciones
                </h3>
                <p className="text-muted-foreground">
                  Alertas automáticas para vacunas, citas y recordatorios importantes
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Inventario
                </h3>
                <p className="text-muted-foreground">
                  Control de stock de medicamentos y productos con alertas de reposición
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Multi-Usuario
                </h3>
                <p className="text-muted-foreground">
                  Roles diferenciados para veterinarios, clientes y administradores
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Reportes
                </h3>
                <p className="text-muted-foreground">
                  Análisis y estadísticas detalladas para mejorar tu clínica
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="caracteristicas" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                ¿Por qué elegir VetCare 360?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Fácil de Usar</h4>
                    <p className="text-muted-foreground">
                      Interfaz intuitiva diseñada para veterinarios y dueños de mascotas
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Seguro y Confiable</h4>
                    <p className="text-muted-foreground">
                      Tus datos protegidos con los más altos estándares de seguridad
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Acceso 24/7</h4>
                    <p className="text-muted-foreground">
                      Consulta información desde cualquier dispositivo, en cualquier momento
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Soporte Dedicado</h4>
                    <p className="text-muted-foreground">
                      Equipo de atención siempre disponible para ayudarte
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Comienza Hoy Mismo</h3>
              <p className="mb-6 text-white/90">
                Únete a cientos de clínicas veterinarias que ya confían en VetCare 360
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Sin costos de instalación</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Configuración en minutos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Capacitación incluida</span>
                </li>
              </ul>
              <Link to="/auth">
                <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90">
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Testimonios reales de veterinarios satisfechos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Heart key={i} className="h-5 w-5 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "VetCare 360 transformó completamente la forma en que gestionamos nuestra clínica. 
                  Los clientes están encantados con el sistema de citas online."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">DM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Dra. María González</p>
                    <p className="text-sm text-muted-foreground">Clínica VetPlus</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Heart key={i} className="h-5 w-5 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "El control de inventario nos ha ahorrado tiempo y dinero. 
                  Ya no tenemos problemas de stock y podemos planificar mejor."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-semibold">JR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Dr. Juan Rodríguez</p>
                    <p className="text-sm text-muted-foreground">Centro Animal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Heart key={i} className="h-5 w-5 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Como dueña de mascota, me encanta poder ver el historial clínico de mis perros 
                  en cualquier momento. Es muy profesional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ana López</p>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 px-4">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a VetCare 360 y lleva tu clínica veterinaria al siguiente nivel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-lg px-8">
                Crear Cuenta Gratis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">VetCare 360</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plataforma completa para clínicas veterinarias modernas
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#servicios" className="hover:text-primary transition-colors">Servicios</a></li>
                <li><a href="#caracteristicas" className="hover:text-primary transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ayuda</a></li>
                <li><a href="#contacto" className="hover:text-primary transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 VetCare 360. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;