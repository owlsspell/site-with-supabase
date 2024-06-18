import { createClient } from "@/utils/supabase/server";
import supabase from "@/utils/supabase/client-supabase";
import EventsInfo from "../components/all-events/events-info";

async function getEventData(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("events").select('*,author: profiles(username,avatar_url)').eq('id', id)
  if (error) throw new Error('Could not find event')
  return data
}
async function getEventImages(id: string) {
  const supabase = createClient()
  const { data: images, error } = await supabase
    .storage
    .from('event_images')
    .list(id)
  if (error) throw new Error('Could not find event')
  return images.map(image => (process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL + "/" + id + "/" + image.name))
}

export default async function EventsPage() {

  // const event = await getEventData(id)
  // const images = await getEventImages(id)

  return (
    <main>
      <EventsInfo />
    </main>
  );
}
