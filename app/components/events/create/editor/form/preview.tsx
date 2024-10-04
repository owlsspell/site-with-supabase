import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import dayjs from 'dayjs';
import Image from 'next/image'
import React, { useMemo } from 'react'
import calendar from "@/images/icons/calendar.svg"
import locationIcon from "@/images/icons/location-event.svg"
import eventTime from "@/images/icons/event-time.svg"
import DOMPurify from 'dompurify';
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import OrangeButton from '@/app/components/buttons/orange-button';
import supabase from '@/utils/supabase/client-supabase';
import { handleError } from '@/lib/functions';
import { tooglePublicEventStatus } from '@/lib/features/createEventSlice';
import Swal from 'sweetalert2';

dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default function Preview() {
    const { image, startDate, startTime, endDate, endTime, name, description, location, text } = useAppSelector((state) => state.createdEventInfo.eventInfo)
    // {
    //     name: 'Reimagining Relationships Workshop 2: Taking attachment further',
    //     description: 'A thought-provoking, expert-led workshop series designed to help you explore and clarify the way you want your close relationships to look',
    //     text: 'The way we pursue intimate relationships has changed enormously over the last few decades, and that change only seems to be accelerating.\n' +
    //       '\n' +
    //       'Where previously there had been a defined set of shared cultural ideas about what people were looking for in relationships, and a clear path (the so-called “relationship escalator”) that everyone was expected to follow - from dating; to sexual exclusivity and moving in together; to marriage, mortgage and, kids - all of that is now, more than ever, being called into question.\n' +
    //       '\n' +
    //       'As the old model is increasingly contested, people are having to grapple with a whole set of complex questions about intimate relationships that have far-reaching implications for how they live their lives.\n' +
    //       '\n',
    //     author_id: '8217fd7d-0e58-4277-8c4d-24213a58623d',
    //     location: 'Online',
    //     price: '£11.55',
    //     timeStart: '2024-07-01T07:30:58+00:00',
    //     timeEnd: '2024-07-04T07:00:04+00:00',
    //     category: 'Family & Education',
    //     format: 'Class',
    //     language: [ 'English' ],
    //     currency: 'U.S. Dollar',
    //     subcategory: [ 'Education' ],
    //   }
    const eventId = useAppSelector((state) => state.createdEventInfo.eventInfo.id)
    const isPublic = useAppSelector((state) => state.createdEventInfo.eventInfo.publish)
    const dispatch = useAppDispatch()

    const durationEvent = useMemo(() => {
        if (!startDate || !startTime || !endDate || !endTime) return null
        const timeStart = dayjs(startDate + startTime).format('ddd, D MMM YYYY H:mm')
        const timeEnd = dayjs(endDate + endTime).format('ddd, D MMM YYYY H:mm')
        const ms = dayjs(timeEnd).diff(dayjs(timeStart))
        const days = dayjs(timeEnd).diff(dayjs(timeStart), "d")
        if (days === 1) return '1 day'
        const minutes = Math.round(ms / 1000 / 60)
        const hours = Math.round(minutes / 60)
        if (minutes === 60) return '1 hour'
        if (hours >= 24) return `${days} days`
        if (minutes < 60) return `${minutes} min`
        if (minutes % 60 === 0) return `${hours} hour`
        return `${hours} hour ${minutes % 60} min`
    }, [startDate, startTime, endDate, endTime,])

    function createMarkup(html: any) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const publishEvent = async () => {
        const { error } = await supabase.from('events').update({ publish: !isPublic }).eq("id", eventId)
        if (error) return handleError()
        dispatch(tooglePublicEventStatus(!isPublic))
        Swal.fire({
            icon: "success",
            title: "Good job!",
            text: "Your event has been published!",
            timer: 1500,
        })
    }
    return (
        <div className='event_details'>
            <div className='event_hero-wrapper'>
                <div className='event_hero'>
                    {image && <Image src={image} alt="" fill />}
                </div>
            </div>
            <div className="event_details-wrapper">
                <div className="event_mainContent">
                    <div className="event_details-time">
                        {startDate && startTime && dayjs(startDate + startTime).format('dddd, D MMM')}
                    </div>
                    <h1 className="event_details-title">{name}</h1>
                    <p>{description}</p>
                    <div className='event_section'>
                        <h2 className="event_section-header">Date and time</h2>
                        <div className="event_section-content">
                            <Image src={calendar} alt="" width={20} height={20} />
                            {startDate && startTime && dayjs(startDate + startTime).format('ddd, D MMM YYYY H:mm')} - {endDate && endTime && dayjs(endDate + endTime).format('ddd, D MMM YYYY H:mm z')}
                        </div>
                    </div>
                    <div className='event_section'>
                        <h2 className="event_section-header">Location</h2>
                        <div className="event_section-content">
                            <Image src={locationIcon} alt="" width={20} height={20} />
                            {location}
                        </div>
                    </div>
                    <div className='event_section'>
                        <h2 className="event_section-header">About this event</h2>
                        <div className="event_section-content">
                            {durationEvent && <Image src={eventTime} alt="" width={20} height={20} />}
                            {durationEvent}
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={createMarkup(text)}>
                    </div>
                </div>
            </div>
            <div className='editor_footer'>
                <OrangeButton className='editor_button' text={isPublic ? "Unpublish" : "Publish"} onClick={publishEvent} />
            </div>
        </div>
    )
}
