import AuthButtonServer from "./components/auth-button/auth-button-server";
import { createClient } from "@/utils/supabase/server";
import NewComment from "./components/new-comment";
import Comments from "./components/comments";
import GrayButton from "./components/buttons/gray-button";
import FullbleedBanner from "./components/homepage/fullbleed-banner"

export default async function Home() {
  const supabase = createClient()
  const { data } = await supabase.from("comments").select('*, author: profiles(*)').order('created_at', { ascending: false });
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <main>
      <FullbleedBanner />
      {/* <AuthButtonServer />
      {session ? <NewComment /> : ""}
      <Comments comments={data as CommentWithAuthor[]} /> */}
    </main>
  );
}
