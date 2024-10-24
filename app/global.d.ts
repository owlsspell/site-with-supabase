import { Database as DB } from "@/types/supabase";

type CommentRow = DB["public"]["Tables"]["comments"]["Row"];
type ProfileRow = DB["public"]["Tables"]["profiles"]["Row"];
type EventRow = DB["public"]["Tables"]["events"]["Row"];
type CategoryRow = DB["public"]["Tables"]["categories"]["Row"];
declare global {
  type Database = DB;
  type UserProfile = ProfileRow;
  type CommentWithAuthor = CommentRow & { author: ProfileRow };
  type EventType = EventRow;
  type EventWithAuthor = EventRow & {
    author: { username: string | null; avatar_url: string } | null;
  };
  type CategoryType = CategoryRow;
}
