import Image from 'next/image'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default async function EventCard({ event }: { event: EventType }) {
    const supabase = createClient()
    const time = useMemo(() => `${event.timeStart.split(':')[0]}:${event.timeStart.split(':')[1]}`, [event.timeStart])

    const { data: images } = await supabase
        .storage
        .from('event_images')
        .list(event.id)

    return (
        <Link className='event_card' href={'/event/' + event.id}>
            {!images || images?.length === 0 ? "" :
                <Image fill src={process.env.NEXT_SUPABASE_STORAGE_PUBLIC_URL + "/" + event.id + "/" + images[0].name} alt="" />}
            <div className='event_details'>
                <div className='event_label'>Just added</div>
                <h4>{event.name}</h4>
                <div className='event_time'>{dayjs(event.date).format(`ddd, D MMM [${time}] z`)} </div>
                <div className='event_billstatus'>{event.price}</div>
            </div>
        </Link>
    )
}
