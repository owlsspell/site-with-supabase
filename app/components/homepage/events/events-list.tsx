import React from 'react'
import EventsCategories from './events-categories'
import EventCard from './event-card'
import { createClient } from '@/utils/supabase/server';

export default async function EventsList() {
    const supabase = createClient()
    const { data } = await supabase.from("events").select('*').order('created_at', { ascending: false }).limit(5);

    // const { data: images } = await supabase
    //     .storage
    //     // .getBucket('event_images')
    //     .from('event_images')
    //     .list("e4eb3625-4949-4378-a4fb-549b6e11024a")
    // .getPublicUrl("")
    // .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
    // .list("8217fd7d-0e58-4277-8c4d-24213a58623d")
    // .list('folder', {
    //     limit: 100,
    //     offset: 0,
    //     sortBy: { column: 'name', order: 'asc' },
    // })
    // .getPublicUrl('8217fd7d-0e58-4277-8c4d-24213a58623d/avatar1.png')

    // console.log('1', process.env.NEXT_SUPABASE_STORAGE_PUBLIC_URL + "/8217fd7d-0e58-4277-8c4d-24213a58623d/" + images[0].name);
    // console.log('images', images);
    return (
        <section className='events_container'>
            <hr />
            <div className='section_title'>
                Browsing events
            </div>
            <hr />
            <EventsCategories />
            <div className='events_list'>
                {!data || data?.length === 0 ? "" : data.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        </section>
    )
}
