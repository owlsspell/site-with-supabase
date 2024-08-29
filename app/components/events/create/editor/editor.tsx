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
import EventCategory from './sections/event-category';
import { Form } from 'react-final-form';
import { EventState } from '@/types/custom-types';

export default function EventEditor({ categories }: { categories: CategoryType[] }) {
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
    const event = useAppSelector((state: any) => state.eventData)
    const createEvent = async (values: EventState) => {
        console.log('values', values);
        console.log('event', event);
        const { data: { user } } = await supabase.auth.getUser();
        // console.log('user,', user);
        if (user) {
            const data = {
                name: event.overview.title,
                description: event.overview.summary,
                text: event.about.about,
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

    const isFullField = (value: string | undefined) => (typeof value === 'undefined') ? true : value.length === 0
    const validate = async (values: EventState) => {
        // const errors = schema.validate(values);
        // const validateValues = validateFormValues(schema);

        // console.log('validateValues!', validateValues);
        console.log('values', values);
        const errors: any = {};
        if (isFullField(values.title) || isFullField(values.summary)) {
            errors.overview = true;
        }

        // console.log('!11111', isFullField(values.endDate) || isFullField(values.endTime) || (!!values.isOnline || isFullField(values.location)));
        if (isFullField(values.startDate) || isFullField(values.startTime) || isFullField(values.endDate) || isFullField(values.endTime) || (!!values.isOnline || isFullField(values.location))) {
            errors.dateAndLocation = true;
        }
        // if (isFullField(values.startDate) || isFullField(values.startTime) || isFullField(values.endDate) || isFullField(values.endTime)) {
        //     console.log('ok');
        //     if (!values.isOnline || !isFullField(values.location)) {
        //         console.log('ok2');
        //         errors.dateAndLocation = true;
        //     }
        // }
        // if (!values.startTime && !values.endTime && (!values.location || !!values.isOnline)) {
        //     errors.dateAndLocation = true;
        //     if (isFullField(values.startTime) && isFullField(values.endTime) && (isFullField(values.location) || isFullField(values.isOnline))) {
        //         errors.dateAndLocation = true;
        //     }
        // }
        if ((!values.category && !values.format) || isFullField(values.category) || isFullField(values.format)) {
            errors.categories = true;
        }
        if ((!values.about) || isFullField(values.about)) {
            errors.about = true;
        }
        // if (!values.date) {
        //     errors.date = 'Required';
        // }
        // if (!values.startTime) {
        //     errors.startTime = 'Required';
        // }
        // if (!values.endTime) {
        //     errors.endTime = 'Required';
        // }
        // if (!values.location) {
        //     errors.location = 'Required';
        // }
        // if (!values.info) {
        //     errors.info = 'Required';
        // }
        // if (!values.category) {
        //     errors.category = 'Required';
        // }
        return errors;
    };
    return (
        <Form
            onSubmit={createEvent}
            validate={validate}
            render={({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    {console.log('errors!!', errors)}
                    {/* {console.log('touched!!', touched)} */}
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
