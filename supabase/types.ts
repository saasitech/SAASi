export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      billing_cycle_option: {
        Row: {
          cycle: number
          discount: number | null
          discount_text: string | null
          discount_type: Database["public"]["Enums"]["discounttype"] | null
          id: number
          name: string
        }
        Insert: {
          cycle: number
          discount?: number | null
          discount_text?: string | null
          discount_type?: Database["public"]["Enums"]["discounttype"] | null
          id?: number
          name: string
        }
        Update: {
          cycle?: number
          discount?: number | null
          discount_text?: string | null
          discount_type?: Database["public"]["Enums"]["discounttype"] | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      feature: {
        Row: {
          display_name: string
          id: number
          name: string
        }
        Insert: {
          display_name: string
          id?: number
          name: string
        }
        Update: {
          display_name?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      pricing: {
        Row: {
          allow_trial: boolean
          default_billing: number | null
          discount_type: Database["public"]["Enums"]["discounttype"] | null
          id: number
          show_billing_options: boolean
          slug: string
          style_id: string
          title: string | null
        }
        Insert: {
          allow_trial?: boolean
          default_billing?: number | null
          discount_type?: Database["public"]["Enums"]["discounttype"] | null
          id?: number
          show_billing_options?: boolean
          slug: string
          style_id: string
          title?: string | null
        }
        Update: {
          allow_trial?: boolean
          default_billing?: number | null
          discount_type?: Database["public"]["Enums"]["discounttype"] | null
          id?: number
          show_billing_options?: boolean
          slug?: string
          style_id?: string
          title?: string | null
        }
        Relationships: []
      }
      pricing__tier__billing_cycle_option: {
        Row: {
          applicable_discount: boolean
          billing_option_id: number
          pricing_id: number
          terms_summary_id: number
          tier_id: number
        }
        Insert: {
          applicable_discount?: boolean
          billing_option_id: number
          pricing_id: number
          terms_summary_id: number
          tier_id: number
        }
        Update: {
          applicable_discount?: boolean
          billing_option_id?: number
          pricing_id?: number
          terms_summary_id?: number
          tier_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pricing__tier__billing_cycle_option_fk_boi"
            columns: ["billing_option_id"]
            isOneToOne: false
            referencedRelation: "billing_cycle_option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing__tier__billing_cycle_option_fk_pi"
            columns: ["pricing_id"]
            isOneToOne: false
            referencedRelation: "pricing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing__tier__billing_cycle_option_fk_ti"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "tier"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing__tier__billing_cycle_option_fk_tsi"
            columns: ["terms_summary_id"]
            isOneToOne: false
            referencedRelation: "terms_summary"
            referencedColumns: ["id"]
          }
        ]
      }
      terms_summary: {
        Row: {
          id: number
          terms: Json[]
        }
        Insert: {
          id?: number
          terms: Json[]
        }
        Update: {
          id?: number
          terms?: Json[]
        }
        Relationships: []
      }
      tier: {
        Row: {
          auto_payment: boolean
          description: string
          id: number
          name: string
          price: number
          slug: string
          trial: number | null
          trial_text: string | null
        }
        Insert: {
          auto_payment?: boolean
          description: string
          id?: number
          name: string
          price: number
          slug: string
          trial?: number | null
          trial_text?: string | null
        }
        Update: {
          auto_payment?: boolean
          description?: string
          id?: number
          name?: string
          price?: number
          slug?: string
          trial?: number | null
          trial_text?: string | null
        }
        Relationships: []
      }
      tier__feature: {
        Row: {
          feature_id: number
          tier_id: number
        }
        Insert: {
          feature_id: number
          tier_id: number
        }
        Update: {
          feature_id?: number
          tier_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tier__feature_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "feature"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tier__feature_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "tier"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      discounttype: "percent" | "extraCycles" | "none"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

