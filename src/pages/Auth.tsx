import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PawPrint, Mail, Lock, User, Phone, Stethoscope, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para registro
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'vet' as 'admin' | 'vet',
    adminCode: '',
  });

  // Estado para login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0];
      if (firstError) {
        toast({
          title: "Error de validación",
          description: firstError,
          variant: "destructive",
        });
      }
      return;
    }
    
    setIsLoading(true);
    await signIn(loginData.email, loginData.password);
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input using zod schema
    const result = registerSchema.safeParse(registerData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0];
      if (firstError) {
        toast({
          title: "Error de validación",
          description: firstError,
          variant: "destructive",
        });
      }
      return;
    }

    setIsLoading(true);
    
    await signUp(
      registerData.email,
      registerData.password,
      registerData.fullName,
      registerData.phone,
      registerData.role,
      registerData.adminCode
    );
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <PawPrint className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-foreground">VetCare 360</span>
          </Link>
          <p className="text-muted-foreground">
            Gestiona tu clínica veterinaria de forma profesional
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>
              Inicia sesión o crea una cuenta para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando..." : "Iniciar Sesión"}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        O continúa con
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="Juan Pérez"
                        className="pl-10"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        className="pl-10"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Selecciona tu rol</Label>
                    <RadioGroup
                      value={registerData.role}
                      onValueChange={(value: 'admin' | 'vet') => setRegisterData({ ...registerData, role: value })}
                      className="grid gap-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="vet" id="vet" />
                        <Label htmlFor="vet" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Stethoscope className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Veterinario</div>
                            <div className="text-xs text-muted-foreground">
                              Gestiona consultas y pacientes
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Shield className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Administrador</div>
                            <div className="text-xs text-muted-foreground">
                              Control total de la clínica
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {registerData.role === 'admin' && (
                    <div className="space-y-2">
                      <Label htmlFor="adminCode">Código de SuperAdmin</Label>
                      <Input
                        id="adminCode"
                        type="password"
                        placeholder="Ingresa el código"
                        value={registerData.adminCode}
                        onChange={(e) => setRegisterData({ ...registerData, adminCode: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Este código es requerido para crear cuentas de administrador
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda?{" "}
            <Link to="/" className="text-primary hover:underline">
              Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;