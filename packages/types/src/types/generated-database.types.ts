export type Json = Record<string, any>;

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          api_key: string;
          created_at: string;
          currency_id: string;
          deleted_at: string | null;
          id: string;
          name: string;
          owner_id: string;
          production: boolean;
          reporting_period: Database["public"]["Enums"]["TEMPORAL_INTERVALS"];
          settings: Json;
          status: string;
          timezone: string;
          updated_at: string;
        };
        Insert: {
          api_key?: string;
          created_at?: string;
          currency_id: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          production?: boolean;
          reporting_period?: Database["public"]["Enums"]["TEMPORAL_INTERVALS"];
          settings?: Json;
          status?: string;
          timezone?: string;
          updated_at?: string;
        };
        Update: {
          api_key?: string;
          created_at?: string;
          currency_id?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          production?: boolean;
          reporting_period?: Database["public"]["Enums"]["TEMPORAL_INTERVALS"];
          settings?: Json;
          status?: string;
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_currency_id_fkey";
            columns: ["currency_id"];
            isOneToOne: false;
            referencedRelation: "currencies";
            referencedColumns: ["id"];
          }
        ];
      };
      brands: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          name: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          deleted_at?: string | null;
          id: string;
          name: string;
          status: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "brands_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      campaign_funders: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_funders_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      campaign_labels: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_labels_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      campaigns: {
        Row: {
          account_id: string;
          attributes: Json;
          brand_id: string | null;
          budget: number;
          consumption: Json[];
          content: Json;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          divide_budget_in: string;
          end_date: string | null;
          funded_by: string | null;
          id: string;
          labels: Json;
          metadata: Json | null;
          name: string;
          rules: Json;
          start_date: string;
          status: string;
          template_id: string | null;
          type: Database["public"]["Enums"]["CAMPAIGN_TYPES"];
          updated_at: string;
        };
        Insert: {
          account_id: string;
          attributes: Json;
          brand_id?: string | null;
          budget: number;
          consumption?: Json[];
          content?: Json;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          divide_budget_in: string;
          end_date?: string | null;
          funded_by?: string | null;
          id?: string;
          labels?: Json;
          metadata?: Json | null;
          name: string;
          rules: Json;
          start_date: string;
          status: string;
          template_id?: string | null;
          type: Database["public"]["Enums"]["CAMPAIGN_TYPES"];
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          attributes?: Json;
          brand_id?: string | null;
          budget?: number;
          consumption?: Json[];
          content?: Json;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          divide_budget_in?: string;
          end_date?: string | null;
          funded_by?: string | null;
          id?: string;
          labels?: Json;
          metadata?: Json | null;
          name?: string;
          rules?: Json;
          start_date?: string;
          status?: string;
          template_id?: string | null;
          type?: Database["public"]["Enums"]["CAMPAIGN_TYPES"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaigns_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaigns_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          },
          {
            foreignKeyName: "campaigns_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "cms_templates";
            referencedColumns: ["id"];
          }
        ];
      };
      channels: {
        Row: {
          account_id: string;
          brand_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          metadata: Json | null;
          name: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          brand_id: string;
          created_at?: string;
          deleted_at?: string | null;
          id: string;
          metadata?: Json | null;
          name: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          brand_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          metadata?: Json | null;
          name?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "channels_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "channels_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          }
        ];
      };
      cms_templates: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          entity: string;
          id: string;
          name: string;
          schema: Json;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          entity: string;
          id?: string;
          name: string;
          schema?: Json;
          status?: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          entity?: string;
          id?: string;
          name?: string;
          schema?: Json;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cms_templates_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      cron_jobs: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          expression: string;
          id: string;
          last_run: string | null;
          messages: Json;
          next_run: string;
          status: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          deleted_at?: string | null;
          expression: string;
          id?: string;
          last_run?: string | null;
          messages?: Json;
          next_run: string;
          status?: string;
          type: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          expression?: string;
          id?: string;
          last_run?: string | null;
          messages?: Json;
          next_run?: string;
          status?: string;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cron_jobs_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      currencies: {
        Row: {
          code: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          name: string;
          status: string;
          symbol: string;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          status: string;
          symbol: string;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          status?: string;
          symbol?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      custom_event_types: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          type: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "custom_event_types_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      customers: {
        Row: {
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          dob: string | null;
          email: string;
          gender: string | null;
          id: string;
          metadata: Json | null;
          metrics: Json;
          name: string;
          registration_date: string;
          status: string;
          test: boolean;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          deleted_at?: string | null;
          dob?: string | null;
          email: string;
          gender?: string | null;
          id: string;
          metadata?: Json | null;
          metrics?: Json;
          name: string;
          registration_date?: string;
          status?: string;
          test?: boolean;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          dob?: string | null;
          email?: string;
          gender?: string | null;
          id?: string;
          metadata?: Json | null;
          metrics?: Json;
          name?: string;
          registration_date?: string;
          status?: string;
          test?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "customers_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      customers_by_tiers: {
        Row: {
          account_id: string;
          created_at: string;
          customer_id: string;
          id: string;
          status: string;
          tier_id: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          customer_id: string;
          id?: string;
          status: string;
          tier_id: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          customer_id?: string;
          id?: string;
          status?: string;
          tier_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "customers_by_tiers_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "customers_by_tiers_tier_id_fkey";
            columns: ["tier_id"];
            isOneToOne: false;
            referencedRelation: "tiers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_customers";
            columns: ["account_id", "customer_id", "status"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["account_id", "id", "status"];
          }
        ];
      };
      event_tags: {
        Row: {
          account_id: string;
          brand_id: string;
          created_at: string;
          deleted_at: string | null;
          description: string;
          id: string;
          name: string;
          primitive: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          brand_id: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string;
          id?: string;
          name: string;
          primitive: string;
          status: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          brand_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string;
          id?: string;
          name?: string;
          primitive?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_tags_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_tags_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          }
        ];
      };
      events: {
        Row: {
          account_id: string;
          cancelled_at: string | null;
          customer_id: string;
          customer_status: string;
          data: Json;
          deleted_at: string | null;
          fulfilled: boolean;
          fulfilled_at: string | null;
          id: string;
          issued_at: string;
          processing_at: string | null;
          queue_message_id: string | null;
          reserve: number | null;
          resolved_at: string | null;
          result: Json | null;
          reversed_at: string | null;
          rewarding_campaigns: Json;
          status: string;
          tags: Json;
          type: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          cancelled_at?: string | null;
          customer_id: string;
          customer_status: string;
          data: Json;
          deleted_at?: string | null;
          fulfilled?: boolean;
          fulfilled_at?: string | null;
          id?: string;
          issued_at: string;
          processing_at?: string | null;
          queue_message_id?: string | null;
          reserve?: number | null;
          resolved_at?: string | null;
          result?: Json | null;
          reversed_at?: string | null;
          rewarding_campaigns?: Json;
          status: string;
          tags?: Json;
          type: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          cancelled_at?: string | null;
          customer_id?: string;
          customer_status?: string;
          data?: Json;
          deleted_at?: string | null;
          fulfilled?: boolean;
          fulfilled_at?: string | null;
          id?: string;
          issued_at?: string;
          processing_at?: string | null;
          queue_message_id?: string | null;
          reserve?: number | null;
          resolved_at?: string | null;
          result?: Json | null;
          reversed_at?: string | null;
          rewarding_campaigns?: Json;
          status?: string;
          tags?: Json;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_customers";
            columns: ["account_id", "customer_id", "customer_status"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["account_id", "id", "status"];
          }
        ];
      };
      external_gift_cards: {
        Row: {
          account_id: string;
          code: string;
          created_at: string;
          customer_id: string | null;
          deleted_at: string | null;
          expired_at: string | null;
          id: string;
          redeemed_at: string | null;
          reward_id: string;
          rewarded_at: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id?: string;
          code: string;
          created_at?: string;
          customer_id?: string | null;
          deleted_at?: string | null;
          expired_at?: string | null;
          id?: string;
          redeemed_at?: string | null;
          reward_id: string;
          rewarded_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          code?: string;
          created_at?: string;
          customer_id?: string | null;
          deleted_at?: string | null;
          expired_at?: string | null;
          id?: string;
          redeemed_at?: string | null;
          reward_id?: string;
          rewarded_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "external_gift_cards_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "rewards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_customers";
            columns: ["account_id", "customer_id", "status"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["account_id", "id", "status"];
          },
          {
            foreignKeyName: "gift_cards_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          account_id: string;
          brand_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          image_url: string;
          metadata: Json | null;
          name: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          brand_id: string;
          created_at?: string;
          deleted_at?: string | null;
          id: string;
          image_url: string;
          metadata?: Json | null;
          name: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          brand_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          image_url?: string;
          metadata?: Json | null;
          name?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          deleted_at: string | null;
          email: string;
          id: string;
          max_accounts: number;
          name: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          email: string;
          id: string;
          max_accounts?: number;
          name: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          email?: string;
          id?: string;
          max_accounts?: number;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rewards: {
        Row: {
          account_id: string;
          attributes: Json;
          brand_id: string | null;
          conditions: Json;
          content: Json;
          created_at: string;
          deleted_at: string | null;
          description: string;
          id: string;
          name: string;
          status: string;
          template_id: string | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          attributes?: Json;
          brand_id?: string | null;
          conditions?: Json;
          content?: Json;
          created_at?: string;
          deleted_at?: string | null;
          description?: string;
          id?: string;
          name: string;
          status: string;
          template_id?: string | null;
          type: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          attributes?: Json;
          brand_id?: string | null;
          conditions?: Json;
          content?: Json;
          created_at?: string;
          deleted_at?: string | null;
          description?: string;
          id?: string;
          name?: string;
          status?: string;
          template_id?: string | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rewards_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rewards_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          },
          {
            foreignKeyName: "rewards_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "cms_templates";
            referencedColumns: ["id"];
          }
        ];
      };
      stores: {
        Row: {
          account_id: string;
          address: string | null;
          brand_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          metadata: Json | null;
          name: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          address?: string | null;
          brand_id: string;
          created_at?: string;
          deleted_at?: string | null;
          id: string;
          metadata?: Json | null;
          name?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          address?: string | null;
          brand_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          metadata?: Json | null;
          name?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stores_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stores_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          }
        ];
      };
      tiers: {
        Row: {
          account_id: string;
          content: Json;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          entry_conditions: Json;
          exit_conditions: Json;
          id: string;
          level: number;
          name: string;
          status: string;
          template_id: string | null;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          content?: Json;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          entry_conditions: Json;
          exit_conditions: Json;
          id?: string;
          level: number;
          name: string;
          status: string;
          template_id?: string | null;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          content?: Json;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          entry_conditions?: Json;
          exit_conditions?: Json;
          id?: string;
          level?: number;
          name?: string;
          status?: string;
          template_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tiers_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tiers_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "cms_templates";
            referencedColumns: ["id"];
          }
        ];
      };
      timezones: {
        Row: {
          abbreviation: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          name: string;
          status: string;
          updated_at: string;
          utc_offset: unknown;
        };
        Insert: {
          abbreviation: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          status?: string;
          updated_at?: string;
          utc_offset: unknown;
        };
        Update: {
          abbreviation?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          status?: string;
          updated_at?: string;
          utc_offset?: unknown;
        };
        Relationships: [];
      };
      totp_codes: {
        Row: {
          account_id: string;
          code: string;
          customer_id: string;
          expired_at: string;
          freed_at: string;
          status: string;
        };
        Insert: {
          account_id: string;
          code: string;
          customer_id: string;
          expired_at: string;
          freed_at: string;
          status: string;
        };
        Update: {
          account_id?: string;
          code?: string;
          customer_id?: string;
          expired_at?: string;
          freed_at?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_customers";
            columns: ["account_id", "customer_id", "status"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["account_id", "id", "status"];
          },
          {
            foreignKeyName: "totp_codes_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      transactions: {
        Row: {
          account_id: string;
          amount: number;
          attributes: Json;
          brand_id: string | null;
          campaign_id: string | null;
          channel_id: string | null;
          cost: number | null;
          created_at: string;
          deleted_at: string | null;
          details: string;
          event_id: string | null;
          event_type: string | null;
          funded_by: string | null;
          id: string;
          issued_at: string;
          metadata: Json;
          receiver_id: string;
          reward_id: string;
          reward_type: string | null;
          sender_id: string;
          store_id: string | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          amount: number;
          attributes?: Json;
          brand_id?: string | null;
          campaign_id?: string | null;
          channel_id?: string | null;
          cost?: number | null;
          created_at?: string;
          deleted_at?: string | null;
          details: string;
          event_id?: string | null;
          event_type?: string | null;
          funded_by?: string | null;
          id?: string;
          issued_at: string;
          metadata?: Json;
          receiver_id: string;
          reward_id: string;
          reward_type?: string | null;
          sender_id: string;
          store_id?: string | null;
          type: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          amount?: number;
          attributes?: Json;
          brand_id?: string | null;
          campaign_id?: string | null;
          channel_id?: string | null;
          cost?: number | null;
          created_at?: string;
          deleted_at?: string | null;
          details?: string;
          event_id?: string | null;
          event_type?: string | null;
          funded_by?: string | null;
          id?: string;
          issued_at?: string;
          metadata?: Json;
          receiver_id?: string;
          reward_id?: string;
          reward_type?: string | null;
          sender_id?: string;
          store_id?: string | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_brand_id_account_id_fkey";
            columns: ["brand_id", "account_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id", "account_id"];
          },
          {
            foreignKeyName: "transactions_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "rewards";
            referencedColumns: ["id"];
          }
        ];
      };
      users_by_accounts: {
        Row: {
          account_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_by_accounts_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_by_accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      wallets: {
        Row: {
          _totals_: Json;
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          lines: Json;
          owner_id: string;
          status: string;
          totals: Json;
          updated_at: string;
        };
        Insert: {
          _totals_?: Json;
          account_id: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          lines?: Json;
          owner_id: string;
          status?: string;
          totals?: Json;
          updated_at?: string;
        };
        Update: {
          _totals_?: Json;
          account_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          lines?: Json;
          owner_id?: string;
          status?: string;
          totals?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_customers";
            columns: ["account_id", "owner_id", "status"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["account_id", "id", "status"];
          },
          {
            foreignKeyName: "wallets_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_codes_duplicates: {
        Args: {
          account_id: string;
          reward_id: string;
          codes: string[];
        };
        Returns: string[];
      };
      check_file_in_use: {
        Args: {
          image_url: string;
        };
        Returns: undefined;
      };
      commit_coupon_redemption: {
        Args: {
          campaign_id: string;
          customer_id: string;
          code: string;
          consumptions: Database["public"]["CompositeTypes"]["consumption"][];
          wallet: unknown;
          customer: unknown;
          customer_by_tier: unknown;
          transactions: Database["public"]["Tables"]["transactions"]["Row"][];
          gift_cards: Database["public"]["CompositeTypes"]["t_process_gift_card3"][];
        };
        Returns: undefined;
      };
      commit_customer_tier_adjustment: {
        Args: {
          customer: unknown;
          customer_by_tier: unknown;
        };
        Returns: undefined;
      };
      commit_customer_tier_adjustments: {
        Args: {
          p_customers: Database["public"]["Tables"]["customers"]["Row"][];
          p_customers_by_tiers: Database["public"]["Tables"]["customers_by_tiers"]["Row"][];
        };
        Returns: undefined;
      };
      commit_event: {
        Args: {
          consumptions: Database["public"]["CompositeTypes"]["consumption"][];
          wallet: unknown;
          customer: unknown;
          customer_by_tier: unknown;
          transactions: Database["public"]["Tables"]["transactions"]["Row"][];
          gift_cards: Database["public"]["CompositeTypes"]["t_process_gift_card3"][];
        };
        Returns: undefined;
      };
      commit_wallet: {
        Args: {
          wallet: unknown;
          transactions: Database["public"]["Tables"]["transactions"]["Row"][];
        };
        Returns: undefined;
      };
      count_birthday_customers_id: {
        Args: {
          p_account_id: string;
        };
        Returns: number;
      };
      count_events_to_expire: {
        Args: {
          p_account_id: string;
        };
        Returns: number;
      };
      count_wallets_to_clean: {
        Args: {
          p_account_id: string;
        };
        Returns: number;
      };
      create_transactions: {
        Args: {
          transactions: Database["public"]["Tables"]["transactions"]["Row"][];
        };
        Returns: undefined;
      };
      events_to_expire: {
        Args: {
          p_account_id: string;
          p_from: number;
          p_to: number;
        };
        Returns: {
          event_id: string;
          brand_id: string;
          customer_id: string;
        }[];
      };
      gen_totp_code: {
        Args: {
          loop: number;
        };
        Returns: string;
      };
      get_customer_totp: {
        Args: {
          uid: string;
          account_id: string;
        };
        Returns: {
          expired_at: string;
          code: string;
        }[];
      };
      get_customer_with_wallet_by_uid: {
        Args: {
          uid: string;
          account_id: string;
        };
        Returns: {
          customer: Json;
          wallet: Json;
        }[];
      };
      get_totp_customer: {
        Args: {
          code: string;
          account_id: string;
        };
        Returns: {
          customer: Json;
          wallet: Json;
        }[];
      };
      migrate_customer_transactions: {
        Args: {
          new_transactions: Database["public"]["Tables"]["transactions"]["Row"][];
          new_events: Database["public"]["CompositeTypes"]["mct_event2"][];
          selected_customer_id: string;
          selected_account_id: string;
        };
        Returns: undefined;
      };
      migrate_customers_batch: {
        Args: {
          new_customers: Database["public"]["Tables"]["customers"]["Row"][];
          new_customers_by_tiers: Database["public"]["CompositeTypes"]["mcb_tier"][];
          new_wallets: Database["public"]["CompositeTypes"]["mcb_wallet"][];
          new_transactions: Database["public"]["CompositeTypes"]["mcb_transactions5"][];
        };
        Returns: undefined;
      };
      process_gift_cards: {
        Args: {
          gift_cards: Database["public"]["CompositeTypes"]["t_process_gift_card3"][];
        };
        Returns: undefined;
      };
      redeem_coupon_code: {
        Args: {
          campaign_id: string;
          customer_id: string;
          code: string;
        };
        Returns: undefined;
      };
      revert_migration: {
        Args: {
          start_date: string;
          end_date: string;
          selected_account_id: string;
        };
        Returns: undefined;
      };
      select_birthday_customers_id: {
        Args: {
          p_account_id: string;
          p_from: number;
          p_to: number;
        };
        Returns: {
          customer_id: string;
        }[];
      };
      select_tier_downgrade_customers: {
        Args: {
          p_account_id: string;
          p_exclude_tier_id: string;
          p_from: number;
          p_to: number;
        };
        Returns: {
          customer: Json;
          wallet: Json;
        }[];
      };
      select_wallets_to_clean: {
        Args: {
          p_account_id: string;
          p_from: number;
          p_to: number;
        };
        Returns: {
          _totals_: Json;
          account_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          lines: Json;
          owner_id: string;
          status: string;
          totals: Json;
          updated_at: string;
        }[];
      };
      soft_delete_brand: {
        Args: {
          selected_account_id: string;
          selected_brand_id: string;
        };
        Returns: undefined;
      };
      soft_delete_customer: {
        Args: {
          customer_id: string;
          selected_account_id: string;
        };
        Returns: undefined;
      };
      update_campaigns_consumption: {
        Args: {
          consumptions: Database["public"]["CompositeTypes"]["consumption"][];
        };
        Returns: undefined;
      };
      update_customer_metrics: {
        Args: {
          customer: unknown;
        };
        Returns: undefined;
      };
      update_customer_tier: {
        Args: {
          customer_by_tier: unknown;
        };
        Returns: undefined;
      };
      update_job_message: {
        Args: {
          p_job_id: string;
          p_message_id: string;
          p_processing_at: string;
          p_error: string;
        };
        Returns: undefined;
      };
      update_reward: {
        Args: {
          p_reward: unknown;
        };
        Returns: {
          id: string;
          account_id: string;
        }[];
      };
      update_wallet: {
        Args: {
          wallet: unknown;
        };
        Returns: undefined;
      };
    };
    Enums: {
      CAMPAIGN_TYPES: "BEHAVIOR" | "COUPONS";
      TEMPORAL_INTERVALS: "MONTHLY" | "QUARTERLY" | "YEARLY";
    };
    CompositeTypes: {
      consumption: {
        campaign_id: string | null;
        reward_id: string | null;
        amount: number | null;
      };
      mcb_tier: {
        account_id: string | null;
        uid: string | null;
        tier_id: string | null;
      };
      mcb_transactions5: {
        account_id: string | null;
        brand_id: string | null;
        event_id: string | null;
        reward_id: string | null;
        sender_id: string | null;
        uid: string | null;
        amount: number | null;
        details: string | null;
        type: string | null;
        campaign_id: string | null;
        issued_at: string | null;
        metadata: Json | null;
        attributes: Json | null;
        funded_by: string | null;
      };
      mcb_wallet: {
        account_id: string | null;
        uid: string | null;
        lines: Json | null;
        totals: Json | null;
        _totals_: Json | null;
      };
      mct_event2: {
        issued_at: string | null;
        resolved_at: string | null;
        reversed_at: string | null;
        type: string | null;
        account_id: string | null;
        customer_id: string | null;
        status: string | null;
        data: Json | null;
        result: Json | null;
      };
      t_process_gift_card3: {
        account_id: string | null;
        customer_id: string | null;
        reward_id: string | null;
        amount: number | null;
        rewarded_at: string | null;
        redeemed_at: string | null;
        expired_at: string | null;
      };
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
