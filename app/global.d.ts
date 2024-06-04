import { Database as DB } from "@/types/supabase";

type CommentRow = DB["public"]["Tables"]["comments"]["Row"];
type ProfileRow = DB["public"]["Tables"]["profiles"]["Row"];
type Event = DB["public"]["Tables"]["events"]["Row"];
declare global {
  type Database = DB;
  type CommentWithAuthor = CommentRow & { author: ProfileRow };
  type EventType = Event;
}
