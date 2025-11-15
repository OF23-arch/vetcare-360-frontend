import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  role: 'admin' | 'vet' | 'client';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string, role: 'admin' | 'vet', adminCode?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Configurar listener de auth PRIMERO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Usar setTimeout para evitar deadlock
          setTimeout(async () => {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*, user_roles!inner(role)')
              .eq('id', session.user.id)
              .single();
            
            if (profileData && profileData.user_roles?.[0]) {
              const profile = {
                ...profileData,
                role: profileData.user_roles[0].role
              };
              setProfile(profile);
            }
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // LUEGO verificar sesión existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*, user_roles!inner(role)')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData }) => {
            if (profileData && profileData.user_roles?.[0]) {
              const profile = {
                ...profileData,
                role: profileData.user_roles[0].role
              };
              setProfile(profile);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    phone: string, 
    role: 'admin' | 'vet',
    adminCode?: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      if (data.user && role === 'admin') {
        // Validate admin code via edge function
        const { data: validationData, error: validationError } = await supabase.functions.invoke(
          'validate-admin-code',
          {
            body: { 
              adminCode, 
              userId: data.user.id,
              role: 'admin'
            }
          }
        );

        if (validationError || !validationData?.valid) {
          // Delete the user if admin code is invalid
          await supabase.auth.admin.deleteUser(data.user.id);
          toast({
            title: "Código inválido",
            description: "El código de administrador es incorrecto",
            variant: "destructive",
          });
          return { error: { message: 'Código de SuperAdmin inválido' } };
        }
      }

      if (data.user) {
        toast({
          title: "Cuenta creada exitosamente",
          description: "Ya puedes iniciar sesión con tu cuenta",
        });
      }

      return { error: null };
    } catch (error: any) {
      if (error.message?.includes('already registered')) {
        toast({
          title: "Correo ya registrado",
          description: "Este correo ya está en uso. Te redirigimos al login.",
          variant: "destructive",
        });
        setTimeout(() => navigate('/auth'), 2000);
      }
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*, user_roles!inner(role)')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          toast({
            title: "Error al cargar perfil",
            description: "No se pudo cargar tu información de perfil.",
            variant: "destructive",
          });
          return { error: profileError };
        }

        if (profileData && profileData.user_roles?.[0]) {
          const profile = {
            ...profileData,
            role: profileData.user_roles[0].role
          };
          setProfile(profile);
          
          toast({
            title: "Bienvenido",
            description: `Has iniciado sesión como ${profile.role}`,
          });

          // Redirigir según rol
          setTimeout(() => {
            navigate(`/${profile.role}/dashboard`);
          }, 100);
        }
      }

      return { error: null };
    } catch (error: any) {
      console.error('Error en signIn:', error);
      
      // Mostrar mensaje de error específico
      let errorMessage = "Error al iniciar sesión";
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "Correo o contraseña incorrectos";
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = "Por favor confirma tu correo electrónico";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;

      return { error: null };
    } catch (error: any) {
      console.error('Error en signInWithGoogle:', error);
      
      toast({
        title: "Error",
        description: error.message || "Error al iniciar sesión con Google",
        variant: "destructive",
      });

      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};