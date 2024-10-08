import FullbleedBanner from "../components/homepage/fullbleed-banner"
import IconCategories from "../components/homepage/categories/icon-categories";
import EventsListServer from "../components/events/homepage-events/events-list-server";
import { createClient } from "@/utils/supabase/server";

async function getCategories() {
  const supabase = createClient()
  const { data, error } = await supabase.from("categories").select('*').order('id')
  if (error) throw new Error('Could not find event')
  return data
}

export default async function Home() {
  const categories = await getCategories()

  return (
    <main>
      <FullbleedBanner />
      <IconCategories categories={categories} />
      <EventsListServer />
    </main>
  );
}
