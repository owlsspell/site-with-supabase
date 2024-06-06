'use client'
import React, { useState } from 'react'
import info from '@/images/icons/info.svg'
import OrangeButton from '../buttons/orange-button'
import Image from 'next/image'

export default function TicketCounter() {
    const [ticketsCount, setTicketsCount] = useState(1)

    function changeTicketsCount(type: string) {
        if (ticketsCount === 1 && type === 'minus') return
        if (type === 'minus') setTicketsCount(ticketsCount - 1)
        if (type === 'plus') setTicketsCount(ticketsCount + 1)
    }
    return (
        <div className="event_aside">
            <div className="event_ticket">
                <div className="event_ticket-container">
                    <div className="event_ticket-title">General Admission</div>
                    <div className="event_ticket-counter">
                        <button type="button" onClick={() => changeTicketsCount('minus')}>-</button>
                        <span>{ticketsCount}</span>
                        <button type="button" onClick={() => changeTicketsCount('plus')}>+</button>
                    </div>
                </div>
                <div className="event_price">
                    <span>Free</span>
                    <div className="event_price-icon"><Image src={info.src} width={24} height={24} alt=""></Image></div>
                </div>
            </div>
            <OrangeButton text="Reserve a spot" className='reserve-button' />
        </div>
    )
}
