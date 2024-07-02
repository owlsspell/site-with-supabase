import { createClient } from "@/utils/supabase/server";
import FullbleedBanner from "./components/homepage/fullbleed-banner"
import IconCategories from "./components/homepage/categories/icon-categories";
import EventsList from "./components/events/events-list-server";

export default async function Home() {
  // const supabase = createClient()
  // const { data } = await supabase.from("comments").select('*, author: profiles(*)').order('created_at', { ascending: false });
  // const { data: { session } } = await supabase.auth.getSession()

  return (
    <main>
      <FullbleedBanner />
      <IconCategories />
      <EventsList />
      {/* <AuthButtonServer />
      {session ? <NewComment /> : ""}
      <Comments comments={data as CommentWithAuthor[]} /> */}
    </main>
  );
}
