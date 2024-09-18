'use client'
import React from 'react'
import OrangeButton from '@/app/components/buttons/orange-button';
import supabase from '@/utils/supabase/client-supabase';
import { Form } from 'react-final-form';
import { EventState } from '@/types/custom-types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setActiveStep, toogleStepsStatus } from '@/lib/features/drawerStepsSlice';
import GeneralInfo from './form/general-info';
import CreateTickets from './form/tickets/create-tickets';
import { ValidationErrors } from 'final-form';
import { setEventInfo } from '@/lib/features/createEventSlice';
import useWindowSize from '@/hooks/useWindowSizes';
import { useSearchParams } from 'next/navigation';

export default function EventEditor({ categories }: { categories: CategoryType[] }) {
    type GeneralFormState = EventState & { isOpened: typeof isOpened }
    const dispatch = useAppDispatch()
    const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
    const searchParams = useSearchParams()
    const page = searchParams.get("page");
    const eventInfo = useAppSelector((state) => state.createdEventInfo.eventInfo)

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
    const getValuesArrayFromOptions = (values: any) => values ? values.map((item: any) => item.label) : null
    const getValueFromOption = (item: any) => item ? item.value : null
    const getOptionFromValue = (item: any) => ({ value: item, label: item })
    const getMultiOptionsFromValue = (values: any) => values ? values.map((item: string) => ({ value: item, label: item })) : null

    const isOpened = {
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
        categories: false,
    }
    const initialValues = {
        ticketCurrency: { label: "U.S. Dollar", value: "U.S. Dollar" },
        // language: [{ label: "English", value: "English" }],
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

        // text: values.about,
        // author_id: user.id,
        // location: values.isOnline ? 'online' : values.location,
        // // price: "",
        // startDate: values.startDate,
        // startTime: values.startTime,
        // endDate: values.endDate,
        // endTime: values.endTime,
        // category:  getValueFromOption(values.category),
        // subcategory: getValuesArrayFromOptions(values.subcategory),
        // format:  getValueFromOption(values.format),
        // language: getValuesArrayFromOptions(values.language),
    }
    console.log('eventInfo', eventInfo);
    const goToNextStep = (step: number) => { dispatch(setActiveStep(step)) }
    console.log('language!', getMultiOptionsFromValue(eventInfo.language));

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
                startDate: values.startDate,
                startTime: values.startTime,
                endDate: values.endDate,
                endTime: values.endTime,
                category: getValueFromOption(values.category),
                subcategory: getValuesArrayFromOptions(values.subcategory),
                format: getValueFromOption(values.format),
                language: getValuesArrayFromOptions(values.language),
                // currency:[ ""],
            }
            console.log('data', data);
            dispatch(setEventInfo(data))
            dispatch(toogleStepsStatus({ general: true }))
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

    const validate = async (values: GeneralFormState) => {
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

    const getComponent = (step: number | null, isOpened: GeneralFormState['isOpened'], errors: ValidationErrors, touched: { [key: string]: boolean; } | undefined) => {
        switch (step) {
            case 0: return <GeneralInfo isOpened={isOpened} categories={categories} touched={touched} errors={errors} />
            case 1: return <CreateTickets goToNextStep={goToNextStep} />
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
                // validate={validate}
                render={({ handleSubmit, values, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='editor_container'>
                            {console.log('values', values)}
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
