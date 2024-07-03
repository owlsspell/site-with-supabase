import { createClient } from "@/utils/supabase/server";
import EventDetail from "../../../components/event-detail/event-detail";
import supabase from "@/utils/supabase/client-supabase";

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

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const event = await getEventData(id)
  const images = await getEventImages(id)

  return (
    <main>
      <EventDetail event={event[0]} images={images} />
    </main>
  );
}
export async function generateStaticParams() {
  const { data } = await supabase.from("events").select('*').order('created_at', { ascending: false }).limit(5);
  if (!data) throw new Error('Failed to fetch data')
  return data.map(event => ({ id: event.id, }))
}