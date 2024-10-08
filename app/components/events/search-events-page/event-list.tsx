'use client'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks';
import EventCard from '../event-card';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiltersType } from '@/lib/features/eventsFiltersSlice';

export default function EventsList({ events }: { events: EventType[] | null }) {
    const filters = useAppSelector((state) => state.events.filters)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);
    const router = useRouter();

    useEffect(() => {
        if (Object.values(filters).some((item: string) => item.length > 0)) {
            Object.keys(filters).forEach(filterName => {
                const filterValue = filters[filterName as keyof FiltersType];
                if (filterValue && filterValue.length > 0) {
                    params.set(filterName, filterValue.toString());
                } else {
                    params.delete(filterName);
                }
            });
            router.push(`${pathname}?${params.toString()}`);
        }
    }, [filters])

    return (
        <div className="event_list-container">
            <div className='events_list'>
                {!events || events.length === 0 ?
                    <p className='events_notfound'>No one event found</p>
                    : events.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        </div>
    )
}
