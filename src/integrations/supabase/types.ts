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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      cropdata: {
        Row: {
          Crop: string | null
          "Fertilizer/Action": string | null
          ID: number
          Notes: string | null
          Practice: string | null
          Stage: string | null
          Timing: string | null
        }
        Insert: {
          Crop?: string | null
          "Fertilizer/Action"?: string | null
          ID: number
          Notes?: string | null
          Practice?: string | null
          Stage?: string | null
          Timing?: string | null
        }
        Update: {
          Crop?: string | null
          "Fertilizer/Action"?: string | null
          ID?: number
          Notes?: string | null
          Practice?: string | null
          Stage?: string | null
          Timing?: string | null
        }
        Relationships: []
      }
      farmerData: {
        Row: {
          Age: number | null
          Cultivated_Land: number | null
          District: string | null
          Email_Address: string | null
          Full_Name: string | null
          Gender: string | null
          GPS_Coordinates: string | null
          Irrigation_Method: string | null
          Mobile_Number: number | null
          Other_Crops: string | null
          PIN_Code: number | null
          Primary_Crop: string | null
          Soil_Type: string | null
          State: string | null
          Total_Land_Area: number | null
          uid: string
          Village_Town: string | null
        }
        Insert: {
          Age?: number | null
          Cultivated_Land?: number | null
          District?: string | null
          Email_Address?: string | null
          Full_Name?: string | null
          Gender?: string | null
          GPS_Coordinates?: string | null
          Irrigation_Method?: string | null
          Mobile_Number?: number | null
          Other_Crops?: string | null
          PIN_Code?: number | null
          Primary_Crop?: string | null
          Soil_Type?: string | null
          State?: string | null
          Total_Land_Area?: number | null
          uid?: string
          Village_Town?: string | null
        }
        Update: {
          Age?: number | null
          Cultivated_Land?: number | null
          District?: string | null
          Email_Address?: string | null
          Full_Name?: string | null
          Gender?: string | null
          GPS_Coordinates?: string | null
          Irrigation_Method?: string | null
          Mobile_Number?: number | null
          Other_Crops?: string | null
          PIN_Code?: number | null
          Primary_Crop?: string | null
          Soil_Type?: string | null
          State?: string | null
          Total_Land_Area?: number | null
          uid?: string
          Village_Town?: string | null
        }
        Relationships: []
      }
      "mood tracker": {
        Row: {
          created_at: string | null
          energy_level: number | null
          id: number
          location: string | null
          mood: string | null
          mood_emoji: string | null
          mood_value: number | null
          notes: string | null
          recorded_at: string | null
          sleep_hours: number | null
          stress_level: number | null
          updated_at: string | null
          user_id: string | null
          weather: string | null
        }
        Insert: {
          created_at?: string | null
          energy_level?: number | null
          id: number
          location?: string | null
          mood?: string | null
          mood_emoji?: string | null
          mood_value?: number | null
          notes?: string | null
          recorded_at?: string | null
          sleep_hours?: number | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string | null
          weather?: string | null
        }
        Update: {
          created_at?: string | null
          energy_level?: number | null
          id?: number
          location?: string | null
          mood?: string | null
          mood_emoji?: string | null
          mood_value?: number | null
          notes?: string | null
          recorded_at?: string | null
          sleep_hours?: number | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string | null
          weather?: string | null
        }
        Relationships: []
      }
      upcoming_events: {
        Row: {
          Date: string | null
          Host: string | null
          ID: number
          Location: string | null
          Mode: string | null
          Speaker: string | null
          Time: string | null
          "Title of Event": string | null
        }
        Insert: {
          Date?: string | null
          Host?: string | null
          ID: number
          Location?: string | null
          Mode?: string | null
          Speaker?: string | null
          Time?: string | null
          "Title of Event"?: string | null
        }
        Update: {
          Date?: string | null
          Host?: string | null
          ID?: number
          Location?: string | null
          Mode?: string | null
          Speaker?: string | null
          Time?: string | null
          "Title of Event"?: string | null
        }
        Relationships: []
      }
      userData: {
        Row: {
          created_at: string
          email: string | null
          firstName: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstName?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: string
          phone?: string | null
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
