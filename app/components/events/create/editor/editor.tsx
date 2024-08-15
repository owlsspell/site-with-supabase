'use client'
import React, { useState } from 'react'
import SwiperGalery from './sections/swiper-galery';
import EventTitle from './sections/event-title';
import ContainerHoc from './container-hoc';
import EventDateAndLocation from './sections/event-date-and-location';
import AboutEvent from './sections/about-event';
import OrangeButton from '@/app/components/buttons/orange-button';

export default function EventEditor() {
    const [isOpened, toogleOpened] = useState({
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
    })
    const changeVisibility = (field: string, value: boolean) => {
        console.log('field', field, value);
        toogleOpened({ ...isOpened, [field]: value })
        console.log('isOpened', isOpened);
    }
    return (
        <div className='editor_container'>
            <div className='editor_body'>
                <ContainerHoc classes="editor_picture" field="image" isOpened={isOpened.image} changeVisibility={changeVisibility}>
                    <SwiperGalery />
                </ContainerHoc>
                <ContainerHoc field="overview" isOpened={isOpened.overview} changeVisibility={changeVisibility}>
                    <EventTitle isOpened={isOpened.overview} changeVisibility={changeVisibility} />
                </ContainerHoc>
                <ContainerHoc field="dateAndLocation" isOpened={isOpened.dateAndLocation} changeVisibility={changeVisibility}>
                    <EventDateAndLocation />
                </ContainerHoc>
                <ContainerHoc field="about" isOpened={isOpened.about} changeVisibility={changeVisibility}>
                    <AboutEvent />
                </ContainerHoc>
            </div >
            <div className='editor_footer'>
                <OrangeButton className='editor_button' text="Save and continue" />
            </div>
        </div>
    )
}
