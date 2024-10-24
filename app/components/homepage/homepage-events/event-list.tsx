'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import EventCard from '../../events/event-card';
import { usePathname } from 'next/navigation';

export default function EventsList({ events, getEvents }: { events: EventType[], getEvents: (activeFilter: string) => Promise<EventType[]> }) {
    const activeFilter: string | null = useAppSelector((state: RootState) => state.events.activeTab)
    const [eventCards, setEventCards] = useState<EventType[]>(events)
    const pathname = usePathname()

    useEffect(() => {
        async function fetchData() {
            const result = await getEvents(activeFilter as string)
            setEventCards(result)
        }
        fetchData();
    }, [activeFilter, pathname])

    return (
        <div className="event_list-container">
            <div className='events_list'>
                {!eventCards || eventCards.length === 0 ?
                    <p className='events_notfound'>No one event found</p>
                    : eventCards.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        </div>
    )
}
