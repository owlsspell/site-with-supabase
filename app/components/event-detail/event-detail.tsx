import React from 'react'
import Image from 'next/image'
import info from '@/images/icons/info.svg'
import OrangeButton from '../buttons/orange-button'

export default function EventDetail() {
    return (
        <div className='event_details'>
            <div className='event_hero-wrapper'
            // style={{ background: `center / fill no-repeat url(${bg.src})` }}
            >
                {/* <Image src={bg.src} alt="" fill /> */}
                <div className='event_hero'>
                    <img src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F774572339%2F2157870491793%2F1%2Foriginal.20240523-094302?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=d652d809c352105751f439b6fbf71042' alt="" />

                </div>
            </div>
            <div className="event_details-wrapper">
                <div className="event_mainContent">
                    <div className="event_details-time">
                        Sunday, 9 June
                    </div>
                    <h2 className="event_details-title">FORTY AND FORWARD - Free Webinar for Women 40+</h2>
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
