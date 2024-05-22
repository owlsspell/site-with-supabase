import { Database as DB } from "@/types/supabase";

type CommentRow = DB["public"]["Tables"]["comments"]["Row"];
type ProfileRow = DB["public"]["Tables"]["profiles"]["Row"];

declare global {
  type Database = DB;
  type CommentWithAuthor = CommentRow & { author: ProfileRow };
}
