'use client'
import React, { useMemo, useState } from 'react'
import SwiperGalery from './sections/swiper-galery';
import EventTitle from './sections/event-title';
import ContainerHoc from './container-hoc';
import EventDateAndLocation from './sections/event-date-and-location';
import AboutEvent from './sections/about-event';
import OrangeButton from '@/app/components/buttons/orange-button';
import supabase from '@/utils/supabase/client-supabase';
import EventCategory from './sections/event-category';
import { Form } from 'react-final-form';
import { EventState } from '@/types/custom-types';
import { useAppDispatch } from '@/lib/hooks';
import { setActiveStep } from '@/lib/features/drawerStepsSlice';

export default function EventEditor({ categories }: { categories: CategoryType[] }) {
    const dispatch = useAppDispatch()
    // const initialValues: EventState = {
    //     title: "",
    //     summary: "",
    //     date: "",
    //     startTime: "",
    //     endTime: "",
    //     location: "",
    //     isOnline: false,
    //     info: "",
    //     category: "",
    //     subcategory: [],
    //     format: "",
    // };
    const [isOpened, toogleOpened] = useState({
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
        categories: false,
    })
    const [image, changeImage] = useState<null | File>(null)
    const changeVisibility = (field: string, value: boolean) => {
        toogleOpened({ ...isOpened, [field]: value })
    }
    const goToNextStep = (step: number) => dispatch(setActiveStep(step))

    const createEvent = async (values: EventState) => {
        console.log('values', values);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const data = {
                name: values.title,
                description: values.summary,
                text: values.about,
                author_id: user.id,
                location: values.isOnline ? 'online' : values.location,
                // price: "",
                startDate: values.startDate,
                startTime: values.startTime,
                endDate: values.endDate,
                endTime: values.endTime,
                category: values.category,
                subcategory: values.subcategory,
                format: values.format,
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
        goToNextStep(1)
    }

    const isClearField = (value: string | undefined) => (typeof value === 'undefined') ? true : value.length === 0

    const validate = async (values: EventState) => {
        const errors: any = {};
        if (isClearField(values.title) || isClearField(values.summary)) {
            errors.overview = true;
        }
        if (isClearField(values.startDate) || isClearField(values.startTime) || isClearField(values.endDate) || isClearField(values.endTime) || !(!!values.isOnline || !isClearField(values.location))) {
            errors.dateAndLocation = true;
        }
        if ((!values.category && !values.format) || isClearField(values.category) || isClearField(values.format)) {
            errors.categories = true;
        }
        if ((!values.about) || isClearField(values.about)) {
            errors.about = true;
        }
        return errors;
    };
    return (
        <Form
            onSubmit={createEvent}
            // validate={validate}
            render={({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <div className='editor_container'>
                        <div className='editor_body'>
                            <ContainerHoc classes="editor_picture" field="image" touched={touched?.image} errors={errors?.image} image={image} isOpened={isOpened.image} changeVisibility={changeVisibility}>
                                <SwiperGalery image={image} changeImage={changeImage} />
                            </ContainerHoc>
                            <ContainerHoc field="overview" touched={touched?.title || touched?.summary} errors={errors?.overview} isOpened={isOpened.overview} changeVisibility={changeVisibility}>
                                <EventTitle isOpened={isOpened.overview} />
                            </ContainerHoc>
                            <ContainerHoc field="dateAndLocation" touched={touched?.startDate || touched?.startTime || touched?.endDate || touched?.endTime || touched?.location || touched?.isOnline} errors={errors?.dateAndLocation} isOpened={isOpened.dateAndLocation} changeVisibility={changeVisibility}>
                                <EventDateAndLocation isOpened={isOpened.dateAndLocation} />
                            </ContainerHoc>
                            <ContainerHoc field="categories" touched={touched?.category || touched?.subcategory || touched?.format} errors={errors?.categories} isOpened={isOpened.categories} changeVisibility={changeVisibility}>
                                <EventCategory isOpened={isOpened.categories} categories={categories} />
                            </ContainerHoc>
                            <ContainerHoc classes="rich_text" field="about" touched={touched?.about} errors={errors?.about} isOpened={isOpened.about} changeVisibility={changeVisibility}>
                                <AboutEvent isOpened={isOpened.about} />
                            </ContainerHoc>
                        </div >
                        <div className='editor_footer'>
                            <button type='submit'>
                                <OrangeButton className='editor_button' text="Save and continue" />
                            </button>
                        </div>
                    </div>
                </form>
            )
            }
        />
    )
}
