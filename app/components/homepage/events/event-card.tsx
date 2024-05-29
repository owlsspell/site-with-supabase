import Image from 'next/image'
import React from 'react'

export default function EventCard() {
    return (
        <div className='event_card'>
            <img src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F777710589%2F2135859646913%2F1%2Foriginal.20240528-160458?h=230&w=460&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C43%2C1920%2C960&s=722d9172e6d9136df516e757a809ac2f' alt="" />
            <div className='event_details'>
                <div className='event_label'>Just added</div>
                <h4>3-Day stage Mastery Sprint</h4>
                <div className='event_time'>Friday at 14:00 EEST</div>
                <div className='event_billstatus'>Free</div>
            </div>
        </div>
    )
}
