import { PostgrestSingleResponse } from '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc(
      functionName: 'sum_tickets_by_date',
      parameters: { user_id: string }
    ): PostgrestSingleResponse<{ date: string; total_tickets: number }>;
  }
}
