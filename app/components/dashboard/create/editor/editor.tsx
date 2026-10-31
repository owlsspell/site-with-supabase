'use client'
import React, { useEffect } from 'react'
import Button from '@/app/components/custom/buttons/button'
import { Form } from 'react-final-form'
import { ValidationErrors } from 'final-form'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setActiveStep, toogleStepsStatus } from '@/lib/features/drawerStepsSlice'
import { setEventInfo, setEventCreated } from '@/lib/features/createEventSlice'
import useWindowSize from '@/hooks/useWindowSizes'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { handleError } from '@/lib/functions'
import { createEventEditorInitialValues, EventEditorValues, saveEventEditor, validateEventEditor } from '@/lib/event-editor'
import GeneralInfo from './form/general-info'
import CreateTickets from './form/tickets/create-tickets'
import Preview from './form/preview'

export default function EventEditor({ categories }: { categories: CategoryType[] }) {
    const dispatch = useAppDispatch()
    const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
    const eventInfo = useAppSelector((state) => state.createdEventInfo.eventInfo)
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const initialValues = createEventEditorInitialValues(eventInfo)

    const goToNextStep = (step: number) => dispatch(setActiveStep(step))

    const createEvent = async (values: EventEditorValues) => {
        try {
            const { eventInfo: savedEventInfo } = await saveEventEditor(values, eventInfo.id)
            dispatch(setEventInfo(savedEventInfo))
            dispatch(toogleStepsStatus({ general: true }))
            await Swal.fire({
                icon: 'success',
                timer: 2000,
                title: 'You have created an event!',
                text: "Let's move on!",
            })
            goToNextStep(1)
        } catch {
            handleError()
        }
    }

    const validate = (values: EventEditorValues) => validateEventEditor(values, eventInfo.image)

    const getComponent = (
        step: number | null,
        isOpened: EventEditorValues['isOpened'],
        values: EventEditorValues,
        errors: ValidationErrors,
        touched: { [key: string]: boolean } | undefined,
    ) => {
        switch (step) {
            case 0: return <GeneralInfo isOpened={isOpened} categories={categories} touched={touched} errors={errors} values={values as any} />
            case 1: return <CreateTickets goToNextStep={goToNextStep} />
            case 2: return <Preview />
            default: return null
        }
    }

    const { domLoaded } = useWindowSize()

    useEffect(() => {
        dispatch(setEventCreated(Boolean(eventInfo.id)))
    }, [dispatch, eventInfo.id])

    if (!domLoaded) return null

    return (
        <div className="editor_wrapper">
            <Form
                onSubmit={createEvent}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, values, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="editor_container">
                            <div className="editor_body">
                                {getComponent(activeStep, values.isOpened, values as EventEditorValues, errors, touched)}
                            </div>
                            {page === 'general' &&
                                <div className="editor_footer">
                                    <Button variant="orange" type="submit" className="editor_button" text="Save and continue" />
                                </div>}
                        </div>
                    </form>
                )}
            />
        </div>
    )
}