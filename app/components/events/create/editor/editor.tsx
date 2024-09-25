'use client'
import React, { useState } from 'react'
import OrangeButton from '@/app/components/buttons/orange-button';
import supabase from '@/utils/supabase/client-supabase';
import { Form } from 'react-final-form';
import { EventState } from '@/types/custom-types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setActiveStep, toogleStepsStatus } from '@/lib/features/drawerStepsSlice';
import GeneralInfo from './form/general-info';
import CreateTickets from './form/tickets/create-tickets';
import { ValidationErrors } from 'final-form';
import { setEventInfo, toogleEventStatus } from '@/lib/features/createEventSlice';
import useWindowSize from '@/hooks/useWindowSizes';
import { useSearchParams } from 'next/navigation';
import { getMultiOptionsFromValue, getOptionFromValue, getValueFromOption, getValuesArrayFromOptions, isClearField } from '@/lib/functions';
import Preview from './form/preview';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default function EventEditor({ categories }: { categories: CategoryType[] }) {
    type GeneralFormState = EventState & { isOpened: typeof isOpened }
    const dispatch = useAppDispatch()
    const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
    const searchParams = useSearchParams()
    const page = searchParams.get("page");
    const eventInfo = useAppSelector((state) => state.createdEventInfo.eventInfo)
    const [image, changeImage] = useState<null | File>(null)

    const isOpened = {
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
        categories: false,
    }
    const initialValues = {
        ticketCurrency: { label: "U.S. Dollar", value: "U.S. Dollar" },
        isOpened: isOpened,
        title: eventInfo.name,
        summary: eventInfo.description,
        about: eventInfo.text,
        location: eventInfo.location === 'online' ? null : eventInfo.location,
        isOnline: !!(eventInfo.location === 'online'),
        startDate: eventInfo.startDate,
        startTime: eventInfo.startTime,
        endDate: eventInfo.endDate,
        endTime: eventInfo.endTime,
        category: getOptionFromValue(eventInfo.category),
        subcategory: getMultiOptionsFromValue(eventInfo.subcategory),
        format: getOptionFromValue(eventInfo.format),
        language: getMultiOptionsFromValue(eventInfo.language),
    }
    const goToNextStep = (step: number) => { dispatch(setActiveStep(step)) }

    const handleError = () => {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Try again",
        });
    }

    const createEvent = async (values: GeneralFormState) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const data = {
                name: values.title,
                description: values.summary,
                text: values.about,
                author_id: user.id,
                location: values.isOnline ? 'online' : values.location,
                // price: "",
                timeStart: dayjs(`${values.startDate}${values.startTime}`).format('YYYY-MM-DD HH:mm:ss z'),
                timeEnd: dayjs(`${values.endDate}${values.endTime}`).format('YYYY-MM-DD HH:mm:ss z'),
                category: getValueFromOption(values.category),
                subcategory: getValuesArrayFromOptions(values.subcategory),
                format: getValueFromOption(values.format),
                language: getValuesArrayFromOptions(values.language),
                // currency:[ ""],
            }

            const { data: resultData, error } = await supabase.from('events').upsert(!eventInfo.id ? data : { ...data, id: eventInfo.id }, { onConflict: "id" }).select()

            if (error) handleError()

            dispatch(setEventInfo({
                id: resultData ? resultData[0].id : null,
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
                category: getValueFromOption(values.category),
                subcategory: getValuesArrayFromOptions(values.subcategory),
                format: getValueFromOption(values.format),
                language: getValuesArrayFromOptions(values.language),
                // currency:[ ""],
            }))

            if (!image || !resultData) return console.log('resultData null');

            const { data: data2, error: error2 } = await supabase
                .storage
                .from('event_images')
                .upload(encodeURIComponent(`${resultData[0].id}/${image.name}`), image, {
                    upsert: true
                })

            if (error2) handleError()


            dispatch(toogleStepsStatus({ general: true }))
            dispatch(toogleEventStatus(true))
            Swal.fire({
                icon: "success",
                timer: 2000,
            }).then(() => goToNextStep(1))
        }
    }

    const validate = async (values: GeneralFormState) => {
        const errors: any = {};
        if (isClearField(values.title) || isClearField(values.summary)) {
            errors.overview = true;
        }
        if (isClearField(values.startDate) || isClearField(values.startTime) || isClearField(values.endDate) || isClearField(values.endTime) || !(!!values.isOnline || !isClearField(values.location))) {
            errors.dateAndLocation = true;
        }
        if (isClearField(getValueFromOption(values.category)) || isClearField(getValueFromOption(values.format)) || isClearField(getValuesArrayFromOptions(values.language))) {
            errors.categories = true;
        }
        if (isClearField(values.about)) {
            errors.about = true;
        }
        return errors;
    };

    const getComponent = (step: number | null, isOpened: GeneralFormState['isOpened'], errors: ValidationErrors, touched: { [key: string]: boolean; } | undefined) => {
        switch (step) {
            case 0: return <GeneralInfo isOpened={isOpened} categories={categories} touched={touched} errors={errors} image={image} changeImage={changeImage} />
            case 1: return <CreateTickets goToNextStep={goToNextStep} />
            case 2: return <Preview />
            default: return <></>
        }
    }
    console.log('render');
    const { domLoaded } = useWindowSize();
    if (!domLoaded) return <></>
    return (
        <div className='editor_wrapper'>
            <Form
                onSubmit={createEvent}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, values, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='editor_container'>
                            <div className='editor_body'>
                                {getComponent(activeStep, values.isOpened, errors, touched)}
                            </div >
                            {page === 'general' &&
                                <div className='editor_footer'>
                                    <button type='submit'>
                                        <OrangeButton className='editor_button' text="Save and continue" />
                                    </button>
                                </div>}
                        </div>
                    </form>
                )}
            />
        </div>
    )
}
