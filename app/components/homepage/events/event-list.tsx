'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import supabase from '@/utils/supabase/client-supabase';
import EventCard from './event-card';
import { EventRow } from '@/app/global';
import dayjs from 'dayjs';


export default function EventsList() {
    const activeFilter: string | null = useAppSelector((state: RootState) => state.events.activeTab)
    const [eventCards, setEventCards] = useState<EventRow[] | []>([])

    async function getEvents(activeFilter: string) {
        let query = supabase.from("events").select('*').order('timeStart', { ascending: true }).limit(6)

        if (activeFilter === 'All') { query = query }
        if (activeFilter === 'Free') { query = query.eq('price', "Free") }
        if (activeFilter === 'Online') { query = query.eq('location', "Online") }
        if (activeFilter === 'Today') {
            let hours = dayjs().format('HH')
            query = query.lt('timeStart', dayjs().add(24 - +hours, 'hour')).gt('timeStart', dayjs().subtract(+hours, 'hour'))
        }
        if (activeFilter === 'This week') {
            query = query.lt('timeStart', dayjs().add(7, 'day')).gt('timeStart', dayjs().subtract(1, 'day'))
        }

        const { data } = await query
        setEventCards(data as EventRow[])
    }

    useEffect(() => {
        getEvents(activeFilter as string)
    }, [activeFilter])

    return (
        <div className='events_list'>
            {!eventCards || eventCards?.length === 0 ?
                <p className='events_notfound'>No one event found</p>
                : eventCards.map(event => <EventCard key={event.id} event={event} />)}
        </div>
    )
}
