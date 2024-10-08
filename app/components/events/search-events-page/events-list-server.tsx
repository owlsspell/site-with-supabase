import React from 'react'
import EventsCategories from '../events-categories'
import EventsList from './event-list';
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';

async function getEvents(activeFilter: string) {
    'use server'
    const supabase = createClient()
    let query = supabase.from("events").select('*').order('timeStart', { ascending: true }).limit(6).eq("publish", true)
    const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)
    const setDayEnd = dayjs().set('hour', 23).set('minute', 59).set('second', 59)
    let result
    // if (activeFilter === 'All') { query = query }
    // if (activeFilter === 'Free') { query = query.eq('price', "Free") }
    // if (activeFilter === 'Online') { query = query.eq('location', "Online") }
    // if (activeFilter === 'Today') query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd)
    // if (activeFilter === 'This week') query = query.gt('timeStart', setDayStart).lt('timeStart', setDayEnd.day(7))

    // const { data } = await query
    // console.log('data', data?.length);

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
        result = data
    }
    const getEventsByPrice = async (price: string) => {
        if (price === 'Free') query = query.eq('price', "Free")
        if (price === 'Paid') query = query.neq('price', "Free")
        const { data } = await query
        result = data
    }
    const getEventsByField = async (fieldName: string, fieldValue: string) => {
        query = query.eq(fieldName, fieldValue)
        const { data } = await query
        result = data
    }
    const getEventsByContainsValueInArray = async (fieldName: string, fieldValue: string | string[]) => {
        query = query.overlaps(fieldName, fieldValue)
        const { data } = await query
        result = data
    }
    return result ?? []
}

export default async function EventsListServer({ searchParams }: { searchParams: { filter: string } }) {
    const events = await getEvents('All')
    console.log('searchParams!!!!!!!', searchParams);
    return (
        <EventsList events={events} getEvents={getEvents} />
    )
}
