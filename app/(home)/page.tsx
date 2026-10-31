import FullbleedBanner from "../components/homepage/fullbleed-banner"
import IconCategories from "../components/homepage/categories/icon-categories";
import EventsListServer from "../components/homepage/homepage-events/events-list-server";
import { createClient } from "@/utils/supabase/server";

async function getCategories() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("categories").select('*').order('id')

    if (error) {
      console.error('Error loading categories:', error.message)
      return []
    }

    return data ?? []
  } catch (e) {
    console.error('Supabase error:', e)
    return []
  }
}

export default async function Home() {
  const categories = await getCategories()

  return (
    <main>
      <FullbleedBanner />
      {categories.length > 0 && <IconCategories categories={categories} />}
      <EventsListServer />
    </main>
  );
}