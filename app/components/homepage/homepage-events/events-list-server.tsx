import React from 'react'
import EventsCategories from '../../events/events-categories'
import EventsList from './event-list';
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';

async function getEvents(activeFilter: string) {
    'use server'
    const supabase = createClient()
    let query = supabase.from("events").select('*').order('timeStart', { ascending: true }).limit(6).eq("publish", true)
    const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)
    const setDayEnd = dayjs().set('hour', 23).set('minute', 59).set('second', 59)

    if (activeFilter === 'All') { query = query }
    if (activeFilter === 'Free') { query = query.eq('price', "Free") }
    if (activeFilter === 'Online') { query = query.eq('location', "Online") }
    if (activeFilter === 'Today') query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd)
    if (activeFilter === 'This week') query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd.day(7))

    const { data } = await query
    return data ?? []
}

export default async function EventsListServer() {
    const events = await getEvents('All')
    return (
        <section className='events_container'>
            <hr />
            <div className='section_title'>
                Browsing events
            </div>
            <hr />
            <EventsCategories />
            <EventsList events={events} getEvents={getEvents} />
        </section>
    )
}
