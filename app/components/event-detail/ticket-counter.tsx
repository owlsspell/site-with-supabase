'use client'
import React, { useState } from 'react'
import info from '@/images/icons/info.svg'
import OrangeButton from '../custom/buttons/orange-button'
import Image from 'next/image'
import supabase from '@/utils/supabase/client-supabase'
import Swal from 'sweetalert2'

export default function TicketCounter({ eventId }: { eventId: string }) {
    const [ticketsCount, setTicketsCount] = useState(1)

    function changeTicketsCount(type: string) {
        if (ticketsCount === 1 && type === 'minus') return
        if (type === 'minus') setTicketsCount(ticketsCount - 1)
        if (type === 'plus') setTicketsCount(ticketsCount + 1)
    }

    async function reserveSpot() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return
        const { error } = await supabase
            .from('tickets')
            .insert({ user_id: session.user.id, event_id: eventId, ticket_count: ticketsCount })
        if (error) return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Try again",
        });
        Swal.fire({
            title: "Good job!",
            text: "Spot at the event is reserved!",
            icon: "success"
        });
    }

    return (
        <div className="event_aside">
            <div className='event_container'>
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
                        <div className="event_price-icon"><Image src={info} width={24} height={24} alt=""></Image></div>
                    </div>
                </div>
                <OrangeButton text="Reserve a spot" className='reserve-button' onClick={reserveSpot} />
            </div>
        </div>
    )
}
