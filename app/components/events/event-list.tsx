'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import supabase from '@/utils/supabase/client-supabase';
import EventCard from './event-card';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';

export default function EventsList() {
    const activeFilter: string | null = useAppSelector((state: RootState) => state.events.activeTab)
    const filters = useAppSelector((state: RootState) => state.events.filters)
    const [eventCards, setEventCards] = useState<EventType[] | []>([])
    const pathname = usePathname()
    console.log('activeFilter', activeFilter);
    console.log('filters', filters);

    let query = supabase.from("events").select('*').order('timeStart', { ascending: true }).limit(6).eq("publish", true)

    async function getEvents(activeFilter: string) {
        const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)
        const setDayEnd = dayjs().set('hour', 23).set('minute', 59).set('second', 59)

        if (activeFilter === 'All') { query = query }
        if (activeFilter === 'Free') { query = query.eq('price', "Free") }
        if (activeFilter === 'Online') { query = query.eq('location', "Online") }
        if (activeFilter === 'Today') query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd)
        if (activeFilter === 'This week') query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd.day(7))

        const { data } = await query
        setEventCards(data as EventType[])
    }
    async function getEventsByDate(filterName: string) {
        const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)
        const setDayEnd = dayjs().set('hour', 23).set('minute', 59).set('second', 59)
        if (filterName === 'Today') {
            query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd)
        }
        if (filterName === 'Tomorrow') {
            query = query.gt('timeStart', setDayStart.add(1, 'day')).lt('timeStart', setDayEnd.add(1, 'day'))
        }
        if (filterName === 'This weekend') {
            query = query.gt('timeStart', setDayStart.day(6)).lt('timeStart', setDayEnd.day(7))
        }
        if (filterName === 'This week') {
            query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd.day(7))
        }
        if (filterName === 'Next week') {
            query = query.gt('timeStart', setDayStart.day(8)).lt('timeStart', setDayEnd.day(14))
        }
        if (filterName === 'This month') {
            query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd.endOf('month'))
        }
        if (filterName === 'Next month') {
            query = query.gt('timeStart', setDayStart.add(1, 'month').startOf('month')).lt('timeStart', setDayEnd.add(1, 'month').endOf('month'))
        }

        const { data } = await query
        setEventCards(data as EventType[])
    }
    const getEventsByPrice = async (price: string) => {
        if (price === 'Free') query = query.eq('price', "Free")
        if (price === 'Paid') query = query.neq('price', "Free")
        const { data } = await query
        setEventCards(data as EventType[])
    }
    const getEventsByField = async (fieldName: string, fieldValue: string) => {
        query = query.eq(fieldName, fieldValue)
        const { data } = await query
        setEventCards(data as EventType[])
    }
    const getEventsByContainsValueInArray = async (fieldName: string, fieldValue: string | string[]) => {
        query = query.overlaps(fieldName, fieldValue)
        const { data } = await query
        setEventCards(data as EventType[])
    }
    useEffect(() => {
        if (pathname === '/') getEvents(activeFilter as string)
    }, [activeFilter, pathname])

    useEffect(() => {
        if (Object.values(filters).some(item => item.length > 0)) {
            if (filters.category.length > 0) getEventsByField("category", filters.category as string)
            if (filters.subcategory.length > 0) getEventsByContainsValueInArray("subcategory", filters.subcategory)
            if (filters.date.length > 0) getEventsByDate(filters.date as string)
            if (filters.price.length > 0) getEventsByPrice(filters.price as string)
            if (filters.format.length > 0) getEventsByField("format", filters.format as string)
            if (filters.currency.length > 0) getEventsByField("currency", filters.currency as string)
            if (filters.language.length > 0) getEventsByContainsValueInArray("language", filters.language as string[])
        }
        if (Object.values(filters).every(item => item.length === 0)) getEvents('All')
    }, [filters])

    return (
        <div className="event_list-container">
            <div className='events_list'>
                {!eventCards || eventCards?.length === 0 ?
                    <p className='events_notfound'>No one event found</p>
                    : eventCards.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        </div>
    )
}
