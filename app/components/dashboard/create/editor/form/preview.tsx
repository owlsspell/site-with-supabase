import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import dayjs from 'dayjs';
import Image from 'next/image'
import React from 'react'
import calendar from "@/images/icons/calendar.svg"
import locationIcon from "@/images/icons/location-event.svg"
import eventTime from "@/images/icons/event-time.svg"
import DOMPurify from 'dompurify';
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Button from '@/app/components/custom/buttons/button';
import supabase from '@/utils/supabase/client-supabase';
import { formatEventDuration, handleError } from '@/lib/functions';
import { setPublicEventStatus } from '@/lib/features/createEventSlice';
import Swal from 'sweetalert2';

dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default function Preview() {
    const { image, startDate, startTime, endDate, endTime, name, description, location, text } = useAppSelector((state) => state.createdEventInfo.eventInfo)

    const eventId = useAppSelector((state) => state.createdEventInfo.eventInfo.id)
    const isPublic = useAppSelector((state) => state.createdEventInfo.eventInfo.publish)
    const dispatch = useAppDispatch()

    const durationEvent = formatEventDuration(
        startDate && startTime ? `${startDate}T${startTime}` : null,
        endDate && endTime ? `${endDate}T${endTime}` : null,
    )

    function createMarkup(html: any) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const publishEvent = async () => {
        const { error } = await supabase.from('events').update({ publish: !isPublic }).eq("id", eventId)
        if (error) return handleError()
        dispatch(setPublicEventStatus(!isPublic))
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
                <Button variant="orange" className='editor_button' text={isPublic ? "Unpublish" : "Publish"} onClick={publishEvent} />
            </div>
        </div>
    )
}
