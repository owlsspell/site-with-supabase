import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import supabase from '@/utils/supabase/client-supabase'
dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default function EventCard({ event }: { event: EventType }) {
    const [images, setImages] = useState([])
    async function getImages() {
        const { data: images } = await supabase
            .storage
            .from('event_images')
            .list(event.id)
        setImages(images as any)
    }

    useEffect(() => {
        getImages()
    }, [])

    return (
        <Link className='event_card' href={'/event/' + event.id}>
            {!images || images?.length === 0 ? "" :
                <div className='event_image'>
                    <Image fill src={process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL + event.id + "/" + images[0].name} alt="" />
                </div>}
            <div className='event_details'>
                {dayjs().diff(event.created_at, 'h') <= 12 ? "" : <div className='event_label'>Just added</div>}
                <h4>{event.name}</h4>
                <div className='event_time'>{dayjs(event.timeStart).format('ddd, D MMM H:mm z')} </div>
                <div className='event_billstatus'>{event.price}</div>
            </div>
        </Link >
    )
}
