import React from 'react'
import SwiperGalery from './swiper-galery'
import EventTitle from './event-title';
import ContainerHoc from './container-hoc';
import EventDateAndLocation from './event-date-and-location';

export default function EventEditor() {
    return (
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
        </div>
    )
}
