import styles from "./page.module.css";
import AuthButtonServer from "./components/auth-button/auth-button-server";
import { createClient } from "@/utils/supabase/server";
import NewComment from "./components/new-comment";

export default async function Home() {
  const supabase = createClient()
  const { data: notes } = await supabase.from("comments").select('*, profiles(*)').order('created_at', { ascending: false });
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <main className={styles.main}>
      <AuthButtonServer />
      {session ? <NewComment /> : ""}
      <pre>{JSON.stringify(notes, null, 2)}</pre>

    </main>
  );
}
