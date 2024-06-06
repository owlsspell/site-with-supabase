import { Database as DB } from "@/types/supabase";

type CommentRow = DB["public"]["Tables"]["comments"]["Row"];
type ProfileRow = DB["public"]["Tables"]["profiles"]["Row"];
type EventRow = DB["public"]["Tables"]["events"]["Row"];
declare global {
  type Database = DB;
  type CommentWithAuthor = CommentRow & { author: ProfileRow };
  type EventType = EventRow;
  type EventWithAuthor = EventRow & {
    author: { username: string | null; avatar_url: string } | null;
  };
}
