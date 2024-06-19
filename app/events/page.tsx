import { createClient } from "@/utils/supabase/server";
import AllEvents from "../components/all-events/all-events";

async function getCategories() {
  const supabase = createClient()
  const { data, error } = await supabase.from("categories").select('*')
  if (error) throw new Error('Could not find event')
  return data
}

export default async function EventsPage() {

  const categories = await getCategories()
  return (
    <main>
      <AllEvents categories={categories} />
    </main>
  );
}
