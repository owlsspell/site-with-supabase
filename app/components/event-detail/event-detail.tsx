import React, { useMemo } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import calendar from "@/images/icons/calendar.svg"
import location from "@/images/icons/location-event.svg"
import eventTime from "@/images/icons/event-time.svg"
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import TicketCounter from './ticket-counter'
import { createClient } from '@/utils/supabase/server'
import Comments from './comments'
import NewComment from './new-comment'
dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default async function EventDetail({ event, images }: { event: EventWithAuthor, images: string[] }) {
    const durationEvent = useMemo(() => {
        const ms = dayjs(event.timeEnd).diff(dayjs(event.timeStart))
        const days = dayjs(event.timeEnd).diff(dayjs(event.timeStart), "d")
        if (days === 1) return '1 day'
        const minutes = Math.round(ms / 1000 / 60)
        const hours = Math.round(minutes / 60)
        if (minutes === 60) return '1 hour'
        if (hours >= 24) return `${days} days`
        if (minutes < 60) return `${minutes} min`
        if (minutes % 60 === 0) return `${hours} hour`
        return `${hours} hour ${minutes % 60} min`
    }, [event.timeStart, event.timeEnd])

    const supabase = createClient()
    const { data } = await supabase.from("comments").select('*, author: profiles(*)').eq("event_id", event.id).order('created_at', { ascending: false });

    return (
        <div className='event_details'>
            <div className='event_hero-wrapper'>
                <div className='event_hero'>
                    <Image src={images[0]} alt="" fill />
                </div>
            </div>
            <div className="event_details-wrapper">
                <div className="event_mainContent">
                    <div className="event_details-time">
                        {dayjs(event.timeStart).format('dddd, D MMM')}
                    </div>
                    <h1 className="event_details-title">{event.name}</h1>
                    <p>{event.description}</p>
                    {event?.author?.username &&
                        <div className="organizer">
                            <img src={event.author.avatar_url} alt="" />
                            <span>By <strong>{event.author.username}</strong></span>
                        </div>
                    }
                    <div className='event_section'>
                        <h2 className="event_section-header">Date and time</h2>
                        <div className="event_section-content">
                            <Image src={calendar} alt="" width={20} height={20} />
                            {dayjs(event.timeStart).format('ddd, D MMM YYYY H:mm')} - {dayjs(event.timeEnd).format('ddd, D MMM YYYY H:mm z')}
                        </div>
                    </div>
                    <div className='event_section'>
                        <h2 className="event_section-header">Location</h2>
                        <div className="event_section-content">
                            <Image src={location} alt="" width={20} height={20} />
                            {event.location}
                        </div>
                    </div>
                    <div className='event_section'>
                        <h2 className="event_section-header">About this event</h2>
                        <div className="event_section-content">
                            <Image src={eventTime} alt="" width={20} height={20} />
                            {durationEvent}
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: event.text || "" }}>
                    </div>
                    <div className="event_comments event_section">
                        <h2 className="event_section-header">Discussion and Reviews</h2>
                        <NewComment eventId={event.id} />
                        <Comments comments={data as CommentWithAuthor[]} />
                    </div>
                </div>
                <TicketCounter eventId={event.id} />
            </div>
        </div>
    )
}
