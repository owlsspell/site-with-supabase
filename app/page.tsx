import styles from "./page.module.css";
import AuthButton from "./components/auth-button";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient()
  const { data: notes } = await supabase.from("comments").select('*, profiles(*)');

  return (
    <main className={styles.main}>
      <AuthButton />
      <pre>{JSON.stringify(notes, null, 2)}</pre>

    </main>
  );
}
