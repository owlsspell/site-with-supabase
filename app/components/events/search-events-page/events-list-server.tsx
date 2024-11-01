'use server'
import React from 'react'
import EventsList from './event-list';
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';
import { FiltersType } from '@/lib/features/eventsFiltersSlice';

async function getEvents(filters: FiltersType & { search?: string }) {
    'use server'
    const supabase = createClient()
    let query = supabase.from("events").select('*').order('timeStart', { ascending: true }).limit(6).eq("publish", true)
    let result

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
        return data
    }
    const getEventsByPrice = async (price: string) => {
        if (price === 'Free') query = query.eq('price', "Free")
        if (price === 'Paid') query = query.neq('price', "Free")
        const { data } = await query
        return data
    }
    const getEventsByField = async (fieldName: string, fieldValue: string) => {
        query = query.eq(fieldName, fieldValue)
        const { data } = await query
        return data
    }
    const getEventsByContainsValueInArray = async (fieldName: string, fieldValue: string) => {
        query = query.overlaps(fieldName, fieldValue.split(','))
        const { data } = await query
        return data
    }
    const getEventsByName = async () => {
        query = query.ilike('name', `%${filters.search}%`)
        const { data } = await query
        return data
    }

    if (filters.search) result = await getEventsByName()
    if (filters.category) result = await getEventsByField("category", filters.category as string)
    if (filters.subcategory) result = await getEventsByContainsValueInArray("subcategory", filters.subcategory as string)
    if (filters.date) result = await getEventsByDate(filters.date as string)
    if (filters.price) result = await getEventsByPrice(filters.price as string)
    if (filters.format) result = await getEventsByField("format", filters.format as string)
    if (filters.currency) result = await getEventsByField("currency", filters.currency as string)
    if (filters.language) result = await getEventsByContainsValueInArray("language", filters.language as string)
    else {
        const { data } = await query;
        return result = data
    }
    return result ?? []
}

export default async function EventsListServer({ searchParams }: { searchParams: FiltersType }) {
    const events = await getEvents(searchParams)
    return (
        <EventsList events={events} />
    )
}
