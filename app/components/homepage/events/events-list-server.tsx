import React from 'react'
import EventsCategories from './events-categories'
import EventCard from './event-card'
import { createClient } from '@/utils/supabase/server';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import EventsList from './event-list';

export default function EventsListServer() {
    return (
        <section className='events_container'>
            <hr />
            <div className='section_title'>
                Browsing events
            </div>
            <hr />
            <EventsCategories />
            <EventsList />
        </section>
    )
}
