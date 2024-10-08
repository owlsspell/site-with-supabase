import { createClient } from "@/utils/supabase/server";
import AllEvents from "../../components/all-events/all-events";
import { FiltersType } from "@/lib/features/eventsFiltersSlice";

async function getCategories() {
  const supabase = createClient()
  const { data, error } = await supabase.from("categories").select('*').order('id')
  if (error) throw new Error('Could not find event')
  return data
}

export default async function EventsPage({ searchParams }: { searchParams: FiltersType }) {
  const categories = await getCategories()

  return (
    <main>
      <AllEvents categories={categories} searchParams={searchParams} />
    </main>
  );
}
