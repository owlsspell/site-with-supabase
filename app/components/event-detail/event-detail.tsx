import React from 'react'
import Image from 'next/image'
import info from '@/images/icons/info.svg'
import OrangeButton from '../buttons/orange-button'
import dayjs from 'dayjs'

export default function EventDetail({ event, images }: { event: EventType, images: string[] }) {
    console.log('event', event);
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
                        {dayjs(event.date).format('dddd, D MMM')}
                    </div>
                    <h1 className="event_details-title">{event.name}</h1>
                    <p>{event.description}</p>
                    <p>{event.text}</p>
                </div>
                <div className="event_aside">
                    <div className="event_ticket">
                        <div className="event_ticket-container">
                            <div className="event_ticket-title">General Admission</div>
                            <div className="event_ticket-counter">
                                <button type="button">-</button>
                                <span>1</span>
                                <button type="button">+</button>
                            </div>
                        </div>
                        <div className="event_price">
                            <span>Free</span>
                            <div className="event_price-icon"><Image src={info.src} width={24} height={24} alt=""></Image></div>
                        </div>
                    </div>
                    <OrangeButton text="Reserve a spot" className='reserve-button' />
                </div>
            </div>
        </div>
    )
}
