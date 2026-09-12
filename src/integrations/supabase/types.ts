export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      activities: {
        Row: {
          activity_type: string;
          audience: string;
          created_at: string;
          description: string;
          ends_on: string | null;
          id: string;
          location: string;
          starts_on: string;
          title: string;
        };
        Insert: {
          activity_type: string;
          audience?: string;
          created_at?: string;
          description?: string;
          ends_on?: string | null;
          id?: string;
          location?: string;
          starts_on: string;
          title: string;
        };
        Update: {
          activity_type?: string;
          audience?: string;
          created_at?: string;
          description?: string;
          ends_on?: string | null;
          id?: string;
          location?: string;
          starts_on?: string;
          title?: string;
        };
        Relationships: [];
      };
      expeditions: {
        Row: {
          code: string;
          created_at: string;
          end_date: string;
          highlights: string[];
          id: string;
          image_key: string | null;
          leader: string;
          name: string;
          platform: string;
          region: string;
          route_stops: Json;
          slug: string;
          start_date: string;
          summary: string;
          team_size: number;
          themes: string[];
          year: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          end_date: string;
          highlights?: string[];
          id?: string;
          image_key?: string | null;
          leader: string;
          name: string;
          platform: string;
          region: string;
          route_stops?: Json;
          slug: string;
          start_date: string;
          summary: string;
          team_size?: number;
          themes?: string[];
          year: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          end_date?: string;
          highlights?: string[];
          id?: string;
          image_key?: string | null;
          leader?: string;
          name?: string;
          platform?: string;
          region?: string;
          route_stops?: Json;
          slug?: string;
          start_date?: string;
          summary?: string;
          team_size?: number;
          themes?: string[];
          year?: number;
        };
        Relationships: [];
      };
      media_items: {
        Row: {
          caption: string;
          captured_on: string | null;
          created_at: string;
          credit: string;
          duration: string | null;
          expedition_slug: string | null;
          id: string;
          image_key: string | null;
          kind: string;
          theme: string;
          title: string;
        };
        Insert: {
          caption?: string;
          captured_on?: string | null;
          created_at?: string;
          credit?: string;
          duration?: string | null;
          expedition_slug?: string | null;
          id?: string;
          image_key?: string | null;
          kind: string;
          theme?: string;
          title: string;
        };
        Update: {
          caption?: string;
          captured_on?: string | null;
          created_at?: string;
          credit?: string;
          duration?: string | null;
          expedition_slug?: string | null;
          id?: string;
          image_key?: string | null;
          kind?: string;
          theme?: string;
          title?: string;
        };
        Relationships: [];
      };
      outreach_drafts: {
        Row: {
          audience: string;
          created_at: string;
          id: string;
          newsletter: string;
          press_note: string;
          social_posts: string;
          source_title: string;
          source_type: string;
          tone: string;
        };
        Insert: {
          audience: string;
          created_at?: string;
          id?: string;
          newsletter?: string;
          press_note?: string;
          social_posts?: string;
          source_title: string;
          source_type: string;
          tone: string;
        };
        Update: {
          audience?: string;
          created_at?: string;
          id?: string;
          newsletter?: string;
          press_note?: string;
          social_posts?: string;
          source_title?: string;
          source_type?: string;
          tone?: string;
        };
        Relationships: [];
      };
      repository_items: {
        Row: {
          abstract: string;
          authors: string;
          created_at: string;
          expedition_slug: string | null;
          file_format: string;
          file_size: string;
          id: string;
          item_type: string;
          reference: string;
          theme: string;
          title: string;
          year: number;
        };
        Insert: {
          abstract?: string;
          authors?: string;
          created_at?: string;
          expedition_slug?: string | null;
          file_format?: string;
          file_size?: string;
          id?: string;
          item_type: string;
          reference?: string;
          theme: string;
          title: string;
          year: number;
        };
        Update: {
          abstract?: string;
          authors?: string;
          created_at?: string;
          expedition_slug?: string | null;
          file_format?: string;
          file_size?: string;
          id?: string;
          item_type?: string;
          reference?: string;
          theme?: string;
          title?: string;
          year?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
