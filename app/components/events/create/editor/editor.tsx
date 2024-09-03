'use client'
import React, { useEffect, useRef, useState } from 'react'
import OrangeButton from '@/app/components/buttons/orange-button';
import supabase from '@/utils/supabase/client-supabase';
import { Form } from 'react-final-form';
import { EventState } from '@/types/custom-types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setActiveStep } from '@/lib/features/drawerStepsSlice';
import GeneralInfo from './form/general-info';
import CreateTickets from './form/create-tickets';
import { ValidationErrors } from 'final-form';

export default function EventEditor({ categories }: { categories: CategoryType[] }) {
    const dispatch = useAppDispatch()
    const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
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
    const changeVisibility = (field: string, value: boolean) => {
        toogleOpened({ ...isOpened, [field]: value })
    }
    const goToNextStep = (step: number) => dispatch(setActiveStep(step))

    const getValuesArray = (values: any) => values ? values.map((item: any) => item.label) : null

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
                subcategory: getValuesArray(values.subcategory),
                format: values.format,
                language: getValuesArray(values.language),
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
        if (isClearField(values.category) || isClearField(values.format) || values.language.length === 0) {
            errors.categories = true;
        }
        if (isClearField(values.about)) {
            errors.about = true;
        }
        return errors;
    };

    const getComponent = (step: number, errors: ValidationErrors, touched: { [key: string]: boolean; } | undefined) => {
        switch (step) {
            case 0: return <GeneralInfo changeVisibility={changeVisibility} isOpened={isOpened} categories={categories} touched={touched} errors={errors} />
            case 1: return <CreateTickets />
        }
    }

    return (
        <div className='editor_wrapper'>
            <Form
                onSubmit={createEvent}
                // validate={validate}
                render={({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='editor_container'>
                            <div className='editor_body'>
                                {getComponent(activeStep, errors, touched)}
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
        </div>
    )
}
