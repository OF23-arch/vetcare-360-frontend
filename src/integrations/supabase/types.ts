export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          client_id: string
          created_at: string
          id: string
          notes: string | null
          pet_id: string
          reason: string
          requested_at: string
          scheduled_for: string | null
          status: Database["public"]["Enums"]["appointment_status"]
          teleconference_url: string | null
          type: Database["public"]["Enums"]["appointment_type"]
          updated_at: string
          vet_id: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          notes?: string | null
          pet_id: string
          reason: string
          requested_at?: string
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          teleconference_url?: string | null
          type?: Database["public"]["Enums"]["appointment_type"]
          updated_at?: string
          vet_id?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          pet_id?: string
          reason?: string
          requested_at?: string
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          teleconference_url?: string | null
          type?: Database["public"]["Enums"]["appointment_type"]
          updated_at?: string
          vet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_vet_id_fkey"
            columns: ["vet_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: string
          product_id: string
          quantity: number
          updated_at: string
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          updated_at?: string
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_entries: {
        Row: {
          created_at: string
          diagnosis: string | null
          id: string
          next_appointment: string | null
          prescriptions: string | null
          reason: string
          record_id: string
          temperature: number | null
          treatment: string | null
          updated_at: string
          vet_id: string
          visit_date: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          diagnosis?: string | null
          id?: string
          next_appointment?: string | null
          prescriptions?: string | null
          reason: string
          record_id: string
          temperature?: number | null
          treatment?: string | null
          updated_at?: string
          vet_id: string
          visit_date?: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          diagnosis?: string | null
          id?: string
          next_appointment?: string | null
          prescriptions?: string | null
          reason?: string
          record_id?: string
          temperature?: number | null
          treatment?: string | null
          updated_at?: string
          vet_id?: string
          visit_date?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clinical_entries_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "clinical_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_entries_vet_id_fkey"
            columns: ["vet_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_records: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          pet_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          pet_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          pet_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinical_records_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: true
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          product_id: string
          quantity: number
          reason: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          product_id: string
          quantity: number
          reason?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type?: Database["public"]["Enums"]["movement_type"]
          product_id?: string
          quantity?: number
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          birth_date: string | null
          breed: string | null
          color: string | null
          created_at: string
          id: string
          name: string
          owner_id: string
          photo_url: string | null
          sex: string | null
          species: string
          updated_at: string
        }
        Insert: {
          birth_date?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string
          id?: string
          name: string
          owner_id: string
          photo_url?: string | null
          sex?: string | null
          species: string
          updated_at?: string
        }
        Update: {
          birth_date?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          photo_url?: string | null
          sex?: string | null
          species?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pets_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: Database["public"]["Enums"]["product_category"]
          cost: number
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          reorder_level: number
          sku: string
          stock: number
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["product_category"]
          cost?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          reorder_level?: number
          sku: string
          stock?: number
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category"]
          cost?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          reorder_level?: number
          sku?: string
          stock?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          sale_id: string
          subtotal: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity: number
          sale_id: string
          subtotal: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          sale_id?: string
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          created_by: string
          customer_id: string | null
          id: string
          paid_at: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          customer_id?: string | null
          id?: string
          paid_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          total: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          customer_id?: string | null
          id?: string
          paid_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "vet" | "client"
      appointment_status:
        | "pendiente"
        | "confirmada"
        | "cancelada"
        | "completada"
      appointment_type: "presencial" | "teleconsulta"
      movement_type: "IN" | "OUT" | "ADJUST"
      payment_status: "pending" | "paid" | "cancelled"
      product_category:
        | "alimentos"
        | "medicamentos"
        | "accesorios"
        | "higiene"
        | "juguetes"
        | "otros"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "vet", "client"],
      appointment_status: [
        "pendiente",
        "confirmada",
        "cancelada",
        "completada",
      ],
      appointment_type: ["presencial", "teleconsulta"],
      movement_type: ["IN", "OUT", "ADJUST"],
      payment_status: ["pending", "paid", "cancelled"],
      product_category: [
        "alimentos",
        "medicamentos",
        "accesorios",
        "higiene",
        "juguetes",
        "otros",
      ],
    },
  },
} as const
