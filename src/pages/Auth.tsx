import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { PawPrint, Mail, Lock, User, Phone, Loader2, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'vet' as 'admin' | 'vet',
    adminCode: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(loginData.email, loginData.password);
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      return;
    }

    if (registerData.role === 'admin' && !registerData.adminCode) {
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
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error con Google:', error);
    } finally {
      setIsGoogleLoading(false);
    }
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

              <TabsContent value="login" className="space-y-6 mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-background shadow-sm"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.8055 10.2292C19.8055 9.55056 19.7508 8.86719 19.6328 8.19922H10.2V12.0492H15.6016C15.3773 13.2911 14.6571 14.3898 13.6148 15.0875V17.5866H16.825C18.7172 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                      <path d="M10.2 20.0006C12.8945 20.0006 15.1719 19.1048 16.8289 17.5872L13.6187 15.088C12.7461 15.698 11.6031 16.0428 10.2039 16.0428C7.60156 16.0428 5.38906 14.2831 4.62187 11.9167H1.3125V14.4921C3.00469 17.8698 6.43906 20.0006 10.2 20.0006Z" fill="#34A853"/>
                      <path d="M4.61797 11.917C4.1961 10.6751 4.1961 9.32879 4.61797 8.08691V5.51147H1.31172C-0.0734382 8.26801 -0.0734382 11.7356 1.31172 14.4921L4.61797 11.917Z" fill="#FBBC04"/>
                      <path d="M10.2 3.95772C11.6812 3.93616 13.1094 4.47116 14.1891 5.45772L17.0406 2.60616C15.0844 0.77178 12.4914 -0.214843 10.2 -0.180531C6.43906 -0.180531 3.00469 1.9503 1.3125 5.51105L4.61875 8.08649C5.38281 5.71649 7.59844 3.95772 10.2 3.95772Z" fill="#EA4335"/>
                    </svg>
                  )}
                  <span className="text-sm font-medium">
                    {isGoogleLoading ? "Conectando..." : "Continuar con Google"}
                  </span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">O continúa con email</span>
                  </div>
                </div>

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
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6 mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-background shadow-sm"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.8055 10.2292C19.8055 9.55056 19.7508 8.86719 19.6328 8.19922H10.2V12.0492H15.6016C15.3773 13.2911 14.6571 14.3898 13.6148 15.0875V17.5866H16.825C18.7172 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                      <path d="M10.2 20.0006C12.8945 20.0006 15.1719 19.1048 16.8289 17.5872L13.6187 15.088C12.7461 15.698 11.6031 16.0428 10.2039 16.0428C7.60156 16.0428 5.38906 14.2831 4.62187 11.9167H1.3125V14.4921C3.00469 17.8698 6.43906 20.0006 10.2 20.0006Z" fill="#34A853"/>
                      <path d="M4.61797 11.917C4.1961 10.6751 4.1961 9.32879 4.61797 8.08691V5.51147H1.31172C-0.0734382 8.26801 -0.0734382 11.7356 1.31172 14.4921L4.61797 11.917Z" fill="#FBBC04"/>
                      <path d="M10.2 3.95772C11.6812 3.93616 13.1094 4.47116 14.1891 5.45772L17.0406 2.60616C15.0844 0.77178 12.4914 -0.214843 10.2 -0.180531C6.43906 -0.180531 3.00469 1.9503 1.3125 5.51105L4.61875 8.08649C5.38281 5.71649 7.59844 3.95772 10.2 3.95772Z" fill="#EA4335"/>
                    </svg>
                  )}
                  <span className="text-sm font-medium">
                    {isGoogleLoading ? "Conectando..." : "Continuar con Google"}
                  </span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">O regístrate con email</span>
                  </div>
                </div>

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
                    <Label htmlFor="registerEmail">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerEmail"
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
                        placeholder="+52 123 456 7890"
                        className="pl-10"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerPassword"
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
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
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
                    <Label>Tipo de Cuenta</Label>
                    <RadioGroup
                      value={registerData.role}
                      onValueChange={(value) => setRegisterData({ ...registerData, role: value as 'admin' | 'vet' })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vet" id="vet" />
                        <Label htmlFor="vet" className="font-normal cursor-pointer">
                          Veterinario
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin" className="font-normal cursor-pointer">
                          Administrador
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {registerData.role === 'admin' && (
                    <div className="space-y-2">
                      <Label htmlFor="adminCode">Código de SuperAdmin</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="adminCode"
                          type="password"
                          placeholder="Código secreto"
                          className="pl-10"
                          value={registerData.adminCode}
                          onChange={(e) => setRegisterData({ ...registerData, adminCode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Crear Cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
