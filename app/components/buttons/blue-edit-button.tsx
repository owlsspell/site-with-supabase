'use client'
import { setEventInfo, setEventTicketsInfo, toogleEventStatus } from '@/lib/features/createEventSlice'
import { useAppDispatch } from '@/lib/hooks'
import supabase from '@/utils/supabase/client-supabase'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

export default function BlueEditButton({ id }: { id: string }) {
    const dispatch = useAppDispatch()
    const saveEventToStore = async () => {
        const { data, error } = await supabase.from("events").select('*').eq("id", id)
        if (error) throw new Error('Could not find event')

        const { data: images } = await supabase
            .storage
            .from('event_images')
            .list(data[0].id)

        if (!images || images.length === 0) throw new Error('Images not found')
   
        const { data: image } = supabase
            .storage
            .from('event_images')
            .getPublicUrl(data[0].id + "/" + images[0].name)

        dispatch(setEventInfo({
            id: data ? data[0].id : null,
            image: image.publicUrl,
            name: data[0].name,
            description: data[0].description,
            text: data[0].text,
            author_id: data[0].author_id,
            location: data[0].isOnline ? 'online' : data[0].location,
            startDate: dayjs(data[0].timeStart).format('YYYY-MM-DD'),
            startTime: dayjs(data[0].timeStart).format('HH:mm'),
            endDate: dayjs(data[0].endDate).format('YYYY-MM-DD'),
            endTime: dayjs(data[0].endTime).format('HH:mm'),
            category: data[0].category,
            subcategory: data[0].subcategory,
            format: data[0].format,
            language: data[0].language,
            publish: data ? data[0].publish : false,
        }))
        dispatch(setEventTicketsInfo({
            ticketCost: data[0].price,
            ticketCount: data[0].ticketsTotal,
            ticketCurrency: data[0].currency,
            isFree: data[0].price?.toLowerCase() === 'free'
        }))
    }
    return (
        <Link onClick={saveEventToStore} className="event_button-edit" href="/manage/events/create?page=general">Edit</Link>
    )
}
