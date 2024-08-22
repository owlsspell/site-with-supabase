'use client'
import React, { useMemo, useState } from 'react'
import SwiperGalery from './sections/swiper-galery';
import EventTitle from './sections/event-title';
import ContainerHoc from './container-hoc';
import EventDateAndLocation from './sections/event-date-and-location';
import AboutEvent from './sections/about-event';
import OrangeButton from '@/app/components/buttons/orange-button';
import { useAppSelector } from '@/lib/hooks';
import supabase from '@/utils/supabase/client-supabase';

export default function EventEditor() {
    const [isOpened, toogleOpened] = useState({
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
    })
    const [image, changeImage] = useState<null | File>(null)
    const changeVisibility = (field: string, value: boolean) => {
        toogleOpened({ ...isOpened, [field]: value })
    }
    const event = useAppSelector((state: any) => state.eventData)
    const createEvent = async () => {
        console.log('event', event);
        const { data: { user } } = await supabase.auth.getUser();
        console.log('user,', user);
        if (user) {
            const data = {
                name: event.overview.title,
                description: event.overview.summary,
                text: event.about.info,
                author_id: user.id,
                location: event.dateAndLocation.location,
                // price: "",
                timeStart: event.dateAndLocation.startTime,
                timeEnd: event.dateAndLocation.endTime,
                // category :"",
                // subcategory :[""],
                // format :"",
                // language:[ ""],
                // currency:[ ""],
            }
            console.log('data', data);
            // await supabase.from('events').insert({ text: comment, user_id: user.id, event_id: eventId })
            // revalidatePath("/event/[id]")
        }
        // if (!!image) {
        //     const { data, error } = await supabase
        //         .storage
        //         .from('event_images')
        //         .upload(image.name, image)
        //     console.log('data,error', data, error);
        // }
    }
    return (
        <div className='editor_container'>
            <div className='editor_body'>
                <ContainerHoc classes="editor_picture" field="image" image={image} isOpened={isOpened.image} changeVisibility={changeVisibility}>
                    <SwiperGalery image={image} changeImage={changeImage} />
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
