import React from 'react'
import SwiperGalery from './sections/swiper-galery';
import EventTitle from './sections/event-title';
import ContainerHoc from './container-hoc';
import EventDateAndLocation from './sections/event-date-and-location';
import AboutEvent from './sections/about-event';
import OrangeButton from '@/app/components/buttons/orange-button';

export default function EventEditor() {
    return (
        <div className='editor_container'>
            <div className='editor_body'>
                <ContainerHoc classes="editor_picture">
                    <SwiperGalery />
                </ContainerHoc>
                <ContainerHoc>
                    <EventTitle />
                </ContainerHoc>
                <ContainerHoc>
                    <EventDateAndLocation />
                </ContainerHoc>
                <ContainerHoc>
                    <AboutEvent />
                </ContainerHoc>
            </div >
            <div className='editor_footer'>
                <OrangeButton className='editor_button' text="Save and continue" />
            </div>
        </div>
    )
}
