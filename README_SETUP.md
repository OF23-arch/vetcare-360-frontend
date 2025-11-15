# VetCare 360 - Guía de Configuración y Uso

## 🚀 Inicio Rápido

La aplicación ya está configurada con Lovable Cloud (Supabase integrado). Solo necesitas crear los usuarios de prueba.

## 👥 Crear Usuarios de Prueba

### 1. Crear Usuario Administrador

1. Ve a `/auth`
2. Click en "Registrarse"
3. Llena el formulario:
   - Nombre Completo: `Admin Principal`
   - Correo: `admin@vetcare360.com`
   - Teléfono: `+57 300 111 1111`
   - Contraseña: `admin123`
   - Confirmar Contraseña: `admin123`
   - Rol: Selecciona **Administrador**
   - **Código de SuperAdmin**: `1209` (obligatorio)
4. Click en "Crear Cuenta"

### 2. Crear Usuario Veterinario

1. Ve a `/auth` (o cierra sesión si ya estás logueado)
2. Click en "Registrarse"
3. Llena el formulario:
   - Nombre Completo: `Dr. Carlos García`
   - Correo: `vet@vetcare360.com`
   - Teléfono: `+57 300 222 2222`
   - Contraseña: `vet123`
   - Confirmar Contraseña: `vet123`
   - Rol: Selecciona **Veterinario**
4. Click en "Crear Cuenta"

### 3. Crear Usuario Cliente

Los clientes se crean de dos formas:

**Opción A: Desde el panel del Veterinario**
1. Inicia sesión como veterinario
2. Ve a "Pacientes" → "Crear Cliente"
3. Ingresa los datos del cliente

**Opción B: Auto-registro (si se habilita después)**
- El cliente se registra directamente desde `/auth`

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   └── DashboardLayout.tsx    # Layout principal con sidebar
│   ├── ProtectedRoute.tsx         # Componente para proteger rutas
│   └── ui/                        # Componentes de shadcn/ui
├── contexts/
│   └── AuthContext.tsx            # Contexto de autenticación
├── pages/
│   ├── Auth.tsx                   # Página de login/registro
│   ├── Landing.tsx                # Página de inicio
│   ├── admin/                     # Páginas del administrador
│   ├── client/                    # Páginas del cliente (renombrado de cliente/)
│   └── vet/                       # Páginas del veterinario (renombrado de veterinario/)
└── integrations/
    └── supabase/                  # Cliente y tipos de Supabase
```

## 🗄️ Base de Datos

La base de datos ya está creada con las siguientes tablas:

### Tablas Principales
- `profiles` - Perfiles de usuario
- `user_roles` - Roles de usuario (para seguridad)
- `pets` - Mascotas
- `clinical_records` - Historias clínicas (una por mascota)
- `clinical_entries` - Entradas de historia clínica (consultas)
- `appointments` - Citas
- `products` - Productos del inventario
- `inventory_movements` - Movimientos de inventario
- `sales` - Ventas
- `sale_items` - Items de venta
- `carts` - Carritos de compra
- `cart_items` - Items del carrito

### Datos de Prueba

Ya hay 10 productos cargados en el inventario:
- Alimentos (Purina, Royal Canin)
- Medicamentos (Vacunas, Desparasitantes)
- Accesorios (Collares, Camas)
- Higiene (Shampoo, Arena para gatos)
- Juguetes (Kong)

## 🔐 Autenticación

### Roles del Sistema

1. **Admin** (`admin`):
   - Control total del sistema
   - Gestión de usuarios, inventario, ventas
   - Reportes globales

2. **Veterinario** (`vet`):
   - Gestión de citas y consultas
   - Creación de historias clínicas
   - Gestión de pacientes (mascotas)
   - Puede crear clientes

3. **Cliente** (`client`):
   - Gestión de sus mascotas
   - Solicitud de citas
   - Ver historial médico
   - Comprar en el mercadito

### Código de SuperAdmin

Para crear cuentas de administrador se requiere el código: `1209`

## 🎨 Diseño

La aplicación usa:
- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes
- **Lucide React** para iconos
- Sistema de colores HSL configurable en `src/index.css`

## 📱 Módulos por Rol

### Cliente (`/client/*`)
- Dashboard
- Mis Mascotas
- Citas
- Historial Médico
- Mercadito (tienda online)
- Notificaciones

### Veterinario (`/vet/*`)
- Dashboard
- Agenda
- Consultas
- Pacientes
- Reportes

### Admin (`/admin/*`)
- Dashboard (ventas, clientes)
- Usuarios
- Citas
- Inventario
- Ventas (POS)
- Notificaciones

## 🔄 Próximos Pasos

Funcionalidades por implementar:

1. **Gestión de Mascotas**
   - CRUD completo conectado a base de datos
   - Subida de fotos

2. **Sistema de Citas**
   - Solicitud de citas por clientes
   - Aprobación por veterinarios
   - Notificaciones automáticas
   - Enlaces de teleconsulta

3. **Historias Clínicas**
   - Crear entradas de consulta
   - Exportar a PDF
   - Adjuntar archivos

4. **Inventario**
   - CRUD de productos
   - Alertas de bajo stock
   - Reportes de movimientos

5. **Ventas y Facturación**
   - POS para admin
   - Generación de facturas PDF
   - Integración con Wompi (futuro)

6. **Mercadito**
   - Carrito de compras funcional
   - Checkout
   - Historial de compras

7. **Reportes**
   - Reportes de ventas
   - Reportes de inventario
   - Exportar a PDF/CSV

## 🐛 Solución de Problemas

### No puedo iniciar sesión
- Verifica que hayas confirmado tu email
- La configuración actual tiene auto-confirm habilitado

### Error de permisos (RLS)
- Asegúrate de estar logueado
- Verifica que tu rol tiene permisos para esa acción

### No veo datos
- Verifica que estés logueado con el rol correcto
- Los datos se filtran según el rol del usuario

## 📞 Soporte

Este es un proyecto desarrollado con Lovable AI.

Para ver el backend: Click en el botón "Cloud" en la interfaz de Lovable.