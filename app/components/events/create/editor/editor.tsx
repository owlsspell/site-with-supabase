'use client'
import React, { useState } from 'react'
import SwiperGalery from './sections/swiper-galery';
import EventTitle from './sections/event-title';
import ContainerHoc from './container-hoc';
import EventDateAndLocation from './sections/event-date-and-location';
import AboutEvent from './sections/about-event';
import OrangeButton from '@/app/components/buttons/orange-button';
import { useAppSelector } from '@/lib/hooks';

export default function EventEditor() {
    const [isOpened, toogleOpened] = useState({
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
    })
    const changeVisibility = (field: string, value: boolean) => {
        toogleOpened({ ...isOpened, [field]: value })
    }
    const event = useAppSelector((state: any) => state.eventData)
    const createEvent = () => {
        console.log('event', event);
    }
    return (
        <div className='editor_container'>
            <div className='editor_body'>
                <ContainerHoc classes="editor_picture" field="images" isOpened={isOpened.image} changeVisibility={changeVisibility}>
                    <SwiperGalery />
                </ContainerHoc>
                <ContainerHoc field="overview" isOpened={isOpened.overview} changeVisibility={changeVisibility}>
                    <EventTitle isOpened={isOpened.overview} />
                </ContainerHoc>
                <ContainerHoc field="dateAndLocation" isOpened={isOpened.dateAndLocation} changeVisibility={changeVisibility}>
                    <EventDateAndLocation isOpened={isOpened.dateAndLocation} />
                </ContainerHoc>
                <ContainerHoc classes="rich_text" field="about" isOpened={isOpened.about} changeVisibility={changeVisibility}>
                    <AboutEvent isOpened={isOpened.about} />
                </ContainerHoc>
            </div >
            <div className='editor_footer'>
                <OrangeButton className='editor_button' text="Save and continue" onClick={createEvent} />
            </div>
        </div>
    )
}
