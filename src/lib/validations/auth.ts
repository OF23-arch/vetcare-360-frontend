import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'El correo es requerido')
    .email('Correo electrónico inválido')
    .max(255, 'El correo es demasiado largo'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña es demasiado larga'),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'El nombre completo es requerido')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  email: z
    .string()
    .trim()
    .min(1, 'El correo es requerido')
    .email('Correo electrónico inválido')
    .max(255, 'El correo es demasiado largo'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{8,20}$/, 'Número de teléfono inválido')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña es demasiado larga')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'vet']),
  adminCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.role === 'admin') {
    return data.adminCode && data.adminCode.trim().length > 0;
  }
  return true;
}, {
  message: 'El código de administrador es requerido',
  path: ['adminCode'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
