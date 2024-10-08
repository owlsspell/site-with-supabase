export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
          subcategories: string[] | null;
        };
        Insert: {
          id?: number;
          name: string;
          subcategories?: string[] | null;
        };
        Update: {
          id?: number;
          name?: string;
          subcategories?: string[] | null;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          text: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          text: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          text?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          author_id: string;
          category: string | null;
          created_at: string;
          currency: string | null;
          description: string | null;
          format: string | null;
          id: string;
          language: string[] | null;
          location: string;
          name: string | null;
          price: string | null;
          publish: boolean | null;
          subcategory: string[] | null;
          text: string | null;
          ticketsLeft: number | null;
          ticketsTotal: number | null;
          timeEnd: string;
          timeStart: string;
        };
        Insert: {
          author_id?: string;
          category?: string | null;
          created_at?: string;
          currency?: string | null;
          description?: string | null;
          format?: string | null;
          id?: string;
          language?: string[] | null;
          location: string;
          name?: string | null;
          price?: string | null;
          publish?: boolean | null;
          subcategory?: string[] | null;
          text?: string | null;
          ticketsLeft?: number | null;
          ticketsTotal?: number | null;
          timeEnd?: string;
          timeStart?: string;
        };
        Update: {
          author_id?: string;
          category?: string | null;
          created_at?: string;
          currency?: string | null;
          description?: string | null;
          format?: string | null;
          id?: string;
          language?: string[] | null;
          location?: string;
          name?: string | null;
          price?: string | null;
          publish?: boolean | null;
          subcategory?: string[] | null;
          text?: string | null;
          ticketsLeft?: number | null;
          ticketsTotal?: number | null;
          timeEnd?: string;
          timeStart?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["name"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          id: string;
          name: string;
          username: string | null;
        };
        Insert: {
          avatar_url: string;
          id?: string;
          name: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string;
          id?: string;
          name?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tickets: {
        Row: {
          created_at: string;
          event_id: string;
          id: number;
          ticket_count: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: number;
          ticket_count: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: number;
          ticket_count?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tickets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
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

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
