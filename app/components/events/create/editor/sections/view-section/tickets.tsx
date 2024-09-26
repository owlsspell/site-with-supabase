import { isSomeFieldFull } from '@/lib/functions'
import React from 'react'
import { ticketTypes } from '../../form/tickets/create-tickets';

type PropsType = {
    isFree: boolean;
    ticketCost: number;
    ticketCount: number;
    ticketCurrency: string;
    handleDrawer: (type: string) => void;
}

export default function TicketsInfo({ isFree, ticketCount, ticketCost, ticketCurrency, handleDrawer }: PropsType) {
    return (
        <div className="ticket_item ticket_item-info" onClick={() => handleDrawer(isFree ? 'free' : 'paid')}>
            {isFree ?
                ticketTypes[1].icon
                : ticketTypes[0].icon}
            <div>
                {ticketCount && <h3>{ticketCount} tickets {isFree && "for free"}</h3>}
                {!isFree && ticketCost && <p>{ticketCost} {ticketCurrency}</p>}
            </div>
        </div>
    )
}
