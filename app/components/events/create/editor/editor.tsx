'use client'
import React, { useEffect } from 'react'
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
import { getMultiOptionsFromValue, getOptionFromValue, getValueFromOption, getValuesArrayFromOptions, handleError, isClearField } from '@/lib/functions';
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
        location: eventInfo.location?.toLowerCase() === 'online' ? null : eventInfo.location,
        isOnline: !!(eventInfo.location?.toLowerCase() === 'online'),
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

    const createEvent = async (values: GeneralFormState) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const data = {
                name: values.title,
                description: values.summary,
                text: values.about,
                author_id: user.id,
                location: values.isOnline ? 'online' : values.location,
                timeStart: dayjs(`${values.startDate}${values.startTime}`).format('YYYY-MM-DD HH:mm:ss z'),
                timeEnd: dayjs(`${values.endDate}${values.endTime}`).format('YYYY-MM-DD HH:mm:ss z'),
                category: getValueFromOption(values.category),
                subcategory: getValuesArrayFromOptions(values.subcategory),
                format: getValueFromOption(values.format),
                language: getValuesArrayFromOptions(values.language),
            }

            const { data: resultData, error } = await supabase.from('events').upsert(!eventInfo.id ? data : { ...data, id: eventInfo.id }, { onConflict: "id" }).select()

            if (error) handleError()
            if (!resultData) return console.log('resultData null');

            const { data: image, error: error2 } = await supabase
                .storage
                .from('event_images')
                .upload(encodeURIComponent(`${resultData[0].id}/${resultData[0].id}`), values.image as any, {
                    upsert: true
                })
            if (error2 || !image) return handleError()
            dispatch(setEventInfo({
                id: resultData ? resultData[0].id : null,
                image: values.image ? URL.createObjectURL((values.image) as Blob | MediaSource) : (process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL + image.path),
                name: values.title,
                description: values.summary,
                text: values.about,
                author_id: user.id,
                location: values.isOnline ? 'online' : values.location,
                startDate: values.startDate,
                startTime: values.startTime,
                endDate: values.endDate,
                endTime: values.endTime,
                category: getValueFromOption(values.category),
                subcategory: getValuesArrayFromOptions(values.subcategory),
                format: getValueFromOption(values.format),
                language: getValuesArrayFromOptions(values.language),
                publish: resultData ? resultData[0].publish : false,
            }))

            dispatch(toogleStepsStatus({ general: true }))
            Swal.fire({
                icon: "success",
                timer: 2000,
                title: "You have created an event!",
                text: "Let's move on!",
            }).then(() => goToNextStep(1))
        }
    }
    const validate = async (values: GeneralFormState) => {
        const errors: any = {};
        if (!values.image && !eventInfo.image) {
            errors.image = true;
        }
        if (isClearField(values.title) || isClearField(values.summary)) {
            errors.overview = true;
        }
        if (isClearField(values.startDate) || isClearField(values.startTime) || isClearField(values.endDate) || isClearField(values.endTime) || !(!!values.isOnline || !isClearField(values.location))) {
            errors.dateAndLocation = true;
        }
        const timeStart = dayjs(`${values.startDate}${values.startTime}`).format('YYYY-MM-DD HH:mm:ss z')
        const timeEnd = dayjs(`${values.endDate}${values.endTime}`).format('YYYY-MM-DD HH:mm:ss z')
        if (dayjs(timeStart).unix() > dayjs(timeEnd).unix()) {
            errors.dateAndLocation = true;
            errors.invalidTime = true;
        }
        if (isClearField(getValueFromOption(values.category)) || isClearField(getValueFromOption(values.format)) || isClearField(getValuesArrayFromOptions(values.language))) {
            errors.categories = true;
        }
        if (isClearField(values.about)) {
            errors.about = true;
        }
        return errors;
    };
    const getComponent = (step: number | null, isOpened: GeneralFormState['isOpened'], values: GeneralFormState, errors: ValidationErrors, touched: { [key: string]: boolean; } | undefined) => {
        switch (step) {
            case 0: return <GeneralInfo isOpened={isOpened} categories={categories} touched={touched} errors={errors} values={values} />
            case 1: return <CreateTickets goToNextStep={goToNextStep} />
            case 2: return <Preview />
            default: return <></>
        }
    }
    console.log('render');
    const { domLoaded } = useWindowSize();

    useEffect(() => {
        if (!eventInfo.id || eventInfo.id.length === 0) dispatch(toogleEventStatus(false))
        else dispatch(toogleEventStatus(true))
    }, [eventInfo.id])

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
                                {getComponent(activeStep, values.isOpened, values, errors, touched)}
                            </div >
                            {page === 'general' &&
                                <div className='editor_footer'>
                                    <button type='submit'>
                                        <OrangeButton className='editor_button' text="Save and continue" onClick={handleSubmit} />
                                    </button>
                                </div>}
                        </div>
                    </form>
                )}
            />
        </div>
    )
}
