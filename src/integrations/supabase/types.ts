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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      availability_slots: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean
          slot_duration: number
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean
          slot_duration?: number
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean
          slot_duration?: number
          start_time?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          end_time: string
          id: string
          prospect_id: string
          start_time: string
          status: string
        }
        Insert: {
          booking_date: string
          created_at?: string
          end_time: string
          id?: string
          prospect_id: string
          start_time: string
          status?: string
        }
        Update: {
          booking_date?: string
          created_at?: string
          end_time?: string
          id?: string
          prospect_id?: string
          start_time?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          id: string
          prospect_id: string
          sent_at: string
          sent_by: string | null
          status: string
          subject: string
          template_type: string
        }
        Insert: {
          id?: string
          prospect_id: string
          sent_at?: string
          sent_by?: string | null
          status?: string
          subject: string
          template_type: string
        }
        Update: {
          id?: string
          prospect_id?: string
          sent_at?: string
          sent_by?: string | null
          status?: string
          subject?: string
          template_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      prospects: {
        Row: {
          ai_frustrations: string | null
          ai_tools_usage: string | null
          annual_revenue: string | null
          business_type: string | null
          company_age: string | null
          company_name: string | null
          created_at: string
          current_ai_tools: string | null
          current_tools: string | null
          desired_revenue: string | null
          email: string
          error_prone_areas: string | null
          estimated_budget: string | null
          failure_criteria: string | null
          full_name: string
          growth_vision: string | null
          hours_wasted_weekly: string | null
          id: string
          is_decision_maker: string | null
          main_challenges: string | null
          manual_tasks: string | null
          meeting_objective: string | null
          no_change_consequence: string | null
          numero: number
          phone: string
          previous_investments: string | null
          project_priority: string | null
          project_urgency: string | null
          ready_to_change: string | null
          referral_source: string | null
          role: string | null
          sector: string | null
          session_expectations: string | null
          speed_blocker: string | null
          team_size: string | null
          time_savings: string | null
          top_automation_priority: string | null
          unstructured_processes: string | null
          website_url: string | null
          why_now: string | null
        }
        Insert: {
          ai_frustrations?: string | null
          ai_tools_usage?: string | null
          annual_revenue?: string | null
          business_type?: string | null
          company_age?: string | null
          company_name?: string | null
          created_at?: string
          current_ai_tools?: string | null
          current_tools?: string | null
          desired_revenue?: string | null
          email: string
          error_prone_areas?: string | null
          estimated_budget?: string | null
          failure_criteria?: string | null
          full_name: string
          growth_vision?: string | null
          hours_wasted_weekly?: string | null
          id?: string
          is_decision_maker?: string | null
          main_challenges?: string | null
          manual_tasks?: string | null
          meeting_objective?: string | null
          no_change_consequence?: string | null
          numero?: number
          phone: string
          previous_investments?: string | null
          project_priority?: string | null
          project_urgency?: string | null
          ready_to_change?: string | null
          referral_source?: string | null
          role?: string | null
          sector?: string | null
          session_expectations?: string | null
          speed_blocker?: string | null
          team_size?: string | null
          time_savings?: string | null
          top_automation_priority?: string | null
          unstructured_processes?: string | null
          website_url?: string | null
          why_now?: string | null
        }
        Update: {
          ai_frustrations?: string | null
          ai_tools_usage?: string | null
          annual_revenue?: string | null
          business_type?: string | null
          company_age?: string | null
          company_name?: string | null
          created_at?: string
          current_ai_tools?: string | null
          current_tools?: string | null
          desired_revenue?: string | null
          email?: string
          error_prone_areas?: string | null
          estimated_budget?: string | null
          failure_criteria?: string | null
          full_name?: string
          growth_vision?: string | null
          hours_wasted_weekly?: string | null
          id?: string
          is_decision_maker?: string | null
          main_challenges?: string | null
          manual_tasks?: string | null
          meeting_objective?: string | null
          no_change_consequence?: string | null
          numero?: number
          phone?: string
          previous_investments?: string | null
          project_priority?: string | null
          project_urgency?: string | null
          ready_to_change?: string | null
          referral_source?: string | null
          role?: string | null
          sector?: string | null
          session_expectations?: string | null
          speed_blocker?: string | null
          team_size?: string | null
          time_savings?: string | null
          top_automation_priority?: string | null
          unstructured_processes?: string | null
          website_url?: string | null
          why_now?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
