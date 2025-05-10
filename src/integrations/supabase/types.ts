export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_agent_conversation_participants: {
        Row: {
          agent_id: string
          conversation_id: string
          joined_at: string | null
        }
        Insert: {
          agent_id: string
          conversation_id: string
          joined_at?: string | null
        }
        Update: {
          agent_id?: string
          conversation_id?: string
          joined_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_agent_conversation_participants_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "app_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_agent_conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "app_agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      app_agent_conversations: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          is_group: boolean | null
          last_message: string | null
          last_message_at: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          is_group?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          is_group?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      app_agent_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string | null
          sender_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string | null
          sender_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string | null
          sender_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      app_agents: {
        Row: {
          agent_id: string | null
          avatar_url: string | null
          categories: string[]
          created_at: string
          email: string
          id: string
          is_online: boolean | null
          last_heartbeat: string | null
          name: string
          password: string | null
          reset_password_link: string | null
          role: string
        }
        Insert: {
          agent_id?: string | null
          avatar_url?: string | null
          categories: string[]
          created_at?: string
          email: string
          id?: string
          is_online?: boolean | null
          last_heartbeat?: string | null
          name: string
          password?: string | null
          reset_password_link?: string | null
          role: string
        }
        Update: {
          agent_id?: string | null
          avatar_url?: string | null
          categories?: string[]
          created_at?: string
          email?: string
          id?: string
          is_online?: boolean | null
          last_heartbeat?: string | null
          name?: string
          password?: string | null
          reset_password_link?: string | null
          role?: string
        }
        Relationships: []
      }
      app_button_usage_logs: {
        Row: {
          agent_category: string | null
          agent_id: string
          agent_name: string
          button_id: string
          clicked_at: string
          error_message: string | null
          id: string
          response_status: number | null
          success: boolean
        }
        Insert: {
          agent_category?: string | null
          agent_id: string
          agent_name: string
          button_id: string
          clicked_at?: string
          error_message?: string | null
          id?: string
          response_status?: number | null
          success?: boolean
        }
        Update: {
          agent_category?: string | null
          agent_id?: string
          agent_name?: string
          button_id?: string
          clicked_at?: string
          error_message?: string | null
          id?: string
          response_status?: number | null
          success?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "app_button_usage_logs_button_id_fkey"
            columns: ["button_id"]
            isOneToOne: false
            referencedRelation: "app_custom_buttons"
            referencedColumns: ["id"]
          },
        ]
      }
      app_categories: {
        Row: {
          agent_count: number | null
          created_at: string
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          agent_count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          agent_count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      app_conversations: {
        Row: {
          assigned_to: string | null
          assigned_to_name: string | null
          category: string
          created_at: string
          customer_avatar: string | null
          customer_id: string
          customer_name: string
          customer_phone: string
          id: string
          status: string
          unread_count: number | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          category: string
          created_at?: string
          customer_avatar?: string | null
          customer_id: string
          customer_name: string
          customer_phone: string
          id?: string
          status: string
          unread_count?: number | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          assigned_to_name?: string | null
          category?: string
          created_at?: string
          customer_avatar?: string | null
          customer_id?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          status?: string
          unread_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_conversations_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "app_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      app_custom_buttons: {
        Row: {
          categories: string[]
          created_at: string
          icon: string
          id: string
          is_active: boolean
          name: string
          subject: string | null
          subject_id: string | null
          subsubject: string | null
          subsubject_id: string | null
          updated_at: string
          webhook_url: string
        }
        Insert: {
          categories: string[]
          created_at?: string
          icon: string
          id?: string
          is_active?: boolean
          name: string
          subject?: string | null
          subject_id?: string | null
          subsubject?: string | null
          subsubject_id?: string | null
          updated_at?: string
          webhook_url: string
        }
        Update: {
          categories?: string[]
          created_at?: string
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          subject?: string | null
          subject_id?: string | null
          subsubject?: string | null
          subsubject_id?: string | null
          updated_at?: string
          webhook_url?: string
        }
        Relationships: []
      }
      app_messages: {
        Row: {
          base64: string | null
          body: string | null
          content: string
          conversation_id: string
          id: string
          media_url: string | null
          sender_id: string
          sender_type: string
          status: string
          timestamp: string
          type: string | null
        }
        Insert: {
          base64?: string | null
          body?: string | null
          content: string
          conversation_id: string
          id?: string
          media_url?: string | null
          sender_id: string
          sender_type: string
          status: string
          timestamp?: string
          type?: string | null
        }
        Update: {
          base64?: string | null
          body?: string | null
          content?: string
          conversation_id?: string
          id?: string
          media_url?: string | null
          sender_id?: string
          sender_type?: string
          status?: string
          timestamp?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "app_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      app_notes: {
        Row: {
          content: string
          conversation_id: string
          created_by: string
          created_by_name: string
          id: string
          timestamp: string
          type: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_by: string
          created_by_name: string
          id?: string
          timestamp?: string
          type: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_by?: string
          created_by_name?: string
          id?: string
          timestamp?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_notes_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "app_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      app_notifications: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          link: string | null
          metadata: Json | null
          read: boolean | null
          recipient_id: string
          sender_id: string
          type: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          link?: string | null
          metadata?: Json | null
          read?: boolean | null
          recipient_id: string
          sender_id: string
          type: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          link?: string | null
          metadata?: Json | null
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_notifications_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "app_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      app_quick_messages: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          created_by_name: string | null
          id: string
          tag: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          created_by_name?: string | null
          id?: string
          tag: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          created_by_name?: string | null
          id?: string
          tag?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_quick_messages_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      app_system_settings: {
        Row: {
          created_at: string
          id: string
          setting_name: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_name: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_name?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      Conversas: {
        Row: {
          cliente_id: string | null
          completo: boolean | null
          convID: string | null
          cpf_cnpj: string | null
          create: string | null
          email: string | null
          empresa: number | null
          id: number
          instancia: string | null
          message: string | null
          nome: string | null
          pausado: boolean
          pausado_time: string | null
          telefone: string | null
          timeout: string | null
          tipo_pessoa: string | null
        }
        Insert: {
          cliente_id?: string | null
          completo?: boolean | null
          convID?: string | null
          cpf_cnpj?: string | null
          create?: string | null
          email?: string | null
          empresa?: number | null
          id: number
          instancia?: string | null
          message?: string | null
          nome?: string | null
          pausado?: boolean
          pausado_time?: string | null
          telefone?: string | null
          timeout?: string | null
          tipo_pessoa?: string | null
        }
        Update: {
          cliente_id?: string | null
          completo?: boolean | null
          convID?: string | null
          cpf_cnpj?: string | null
          create?: string | null
          email?: string | null
          empresa?: number | null
          id?: number
          instancia?: string | null
          message?: string | null
          nome?: string | null
          pausado?: boolean
          pausado_time?: string | null
          telefone?: string | null
          timeout?: string | null
          tipo_pessoa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Conversas_empresa_fkey"
            columns: ["empresa"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      empresa: {
        Row: {
          assistant_id: string | null
          created_at: string
          empresa: string | null
          id: number
          instancia: string | null
          whatsapp: string | null
        }
        Insert: {
          assistant_id?: string | null
          created_at?: string
          empresa?: string | null
          id?: number
          instancia?: string | null
          whatsapp?: string | null
        }
        Update: {
          assistant_id?: string | null
          created_at?: string
          empresa?: string | null
          id?: number
          instancia?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      produtos: {
        Row: {
          categoria: string | null
          created_at: string
          id: number
          nome: string | null
          proxima_turma: string | null
          valor: number | null
        }
        Insert: {
          categoria?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          proxima_turma?: string | null
          valor?: number | null
        }
        Update: {
          categoria?: string | null
          created_at?: string
          id?: number
          nome?: string | null
          proxima_turma?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      site_color_templates: {
        Row: {
          accent_color: string
          background_color: string
          button_text_color: string | null
          created_at: string
          id: string
          is_default: boolean
          menu_text_color: string | null
          name: string
          primary_color: string
          secondary_color: string
          text_color: string
          updated_at: string
        }
        Insert: {
          accent_color: string
          background_color: string
          button_text_color?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          menu_text_color?: string | null
          name: string
          primary_color: string
          secondary_color: string
          text_color: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          background_color?: string
          button_text_color?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          menu_text_color?: string | null
          name?: string
          primary_color?: string
          secondary_color?: string
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_configurations: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
      site_contact_messages: {
        Row: {
          created_at: string
          date: string
          email: string
          firstname: string
          id: string
          lastname: string | null
          message: string
          phone: string | null
          read: boolean
        }
        Insert: {
          created_at?: string
          date?: string
          email: string
          firstname: string
          id?: string
          lastname?: string | null
          message: string
          phone?: string | null
          read?: boolean
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          firstname?: string
          id?: string
          lastname?: string | null
          message?: string
          phone?: string | null
          read?: boolean
        }
        Relationships: []
      }
      site_email_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      site_embed_config: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          position: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          position?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_faqs: {
        Row: {
          active: boolean
          answer: string
          created_at: string
          id: string
          order_index: number | null
          question: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          answer: string
          created_at?: string
          id?: string
          order_index?: number | null
          question: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          answer?: string
          created_at?: string
          id?: string
          order_index?: number | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          order_index: number | null
          role: string
          testimonial: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          order_index?: number | null
          role: string
          testimonial: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          order_index?: number | null
          role?: string
          testimonial?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_texts: {
        Row: {
          content: string | null
          created_at: string
          id: string
          key: string
          type: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          key: string
          type?: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          key?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          cliente_id: string | null
          completo: boolean | null
          cpf_cnpj: string | null
          create: string | null
          created_at: string
          email: string | null
          empresa: string | null
          id: number
          instancia: string | null
          message: string | null
          "msg-inicial": boolean | null
          nome: string | null
          pausado: boolean | null
          senha: string | null
          status: string | null
          thread_id: string | null
          timeout: string | null
          tipo_pessoa: string | null
          unidades: string | null
          whatsapp: string | null
        }
        Insert: {
          cliente_id?: string | null
          completo?: boolean | null
          cpf_cnpj?: string | null
          create?: string | null
          created_at?: string
          email?: string | null
          empresa?: string | null
          id?: number
          instancia?: string | null
          message?: string | null
          "msg-inicial"?: boolean | null
          nome?: string | null
          pausado?: boolean | null
          senha?: string | null
          status?: string | null
          thread_id?: string | null
          timeout?: string | null
          tipo_pessoa?: string | null
          unidades?: string | null
          whatsapp?: string | null
        }
        Update: {
          cliente_id?: string | null
          completo?: boolean | null
          cpf_cnpj?: string | null
          create?: string | null
          created_at?: string
          email?: string | null
          empresa?: string | null
          id?: number
          instancia?: string | null
          message?: string | null
          "msg-inicial"?: boolean | null
          nome?: string | null
          pausado?: boolean | null
          senha?: string | null
          status?: string | null
          thread_id?: string | null
          timeout?: string | null
          tipo_pessoa?: string | null
          unidades?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_conversation_to_agent: {
        Args: { conversation_uuid: string; category_type: string }
        Returns: Json
      }
      check_agent_conversation_participant: {
        Args: { agent_id: string; conversation_id: string }
        Returns: boolean
      }
      count_active_conversations_by_agent: {
        Args: Record<PropertyKey, never>
        Returns: {
          agent_id: string
          agent_name: string
          conversation_count: number
        }[]
      }
      find_available_agent_in_category: {
        Args: { category_type: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
