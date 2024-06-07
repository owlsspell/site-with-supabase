import React from 'react'
import EventsCategories from './events-categories'
import EventCard from './event-card'
import { createClient } from '@/utils/supabase/server';

export default async function EventsList() {
    const supabase = createClient()
    const { data } = await supabase.from("events").select('*').order('created_at', { ascending: false }).limit(6);
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
