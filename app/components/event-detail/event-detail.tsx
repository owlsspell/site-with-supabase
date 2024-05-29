import React from 'react'
import bg from "@/images/event_bg.svg"
import Image from 'next/image'

export default function EventDetail() {
    return (
        <div className='event_detail'>
            <div className='event_hero-wrapper'
            // style={{ background: `center / fill no-repeat url(${bg.src})` }}
            >
                {/* <Image src={bg.src} alt="" fill /> */}
                <div className='event_hero'>
                    <img src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F777710589%2F2135859646913%2F1%2Foriginal.20240528-160458?h=230&w=460&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C43%2C1920%2C960&s=722d9172e6d9136df516e757a809ac2f' alt="" />

                </div>
            </div>
        </div>
    )
}
