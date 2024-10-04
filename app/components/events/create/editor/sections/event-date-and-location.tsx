import React from 'react'
import { Field, useField } from 'react-final-form'
import { useAppSelector } from '@/lib/hooks'
import EventDateAndLocationInfo from './view-section/date-and-location'
import { ValidationErrors } from 'final-form'

export default function EventDateAndLocation({ isOpened, errors }: { isOpened: boolean, errors: ValidationErrors }) {
    const startDate = useField('startDate')
    const endDate = useField('endDate')
    const startTime = useField('startTime')
    const endTime = useField('endTime')
    const isOnline = useField('isOnline')
    const location = useField('location')
    const eventInfo = useAppSelector((state) => state.createdEventInfo.eventInfo)
    return (
        <div className='editor_title'>
            <div className={'editor_title-flex ' + (isOpened ? 'show' : 'hidden')}>
                <div className='editor_date-and-location'>
                    <h3>Date and location</h3>
                    <h5>Date and time</h5>
                    <div className='editor-date'>
                        <div className="time">
                            <div className='time-title'>Start:</div>
                            <Field name="startDate" component="input" type="date" className={errors?.invalidTime ? "input-invalid" : ""} />
                            <Field name="startTime" component="input" type="time" className={errors?.invalidTime ? "input-invalid" : ""} />
                        </div>
                        <div className="time">
                            <div className='time-title'>End:</div>
                            <Field name="endDate" component="input" type="date" className={errors?.invalidTime ? "input-invalid" : ""} />
                            <Field name="endTime" component="input" type="time" className={errors?.invalidTime ? "input-invalid" : ""} />
                        </div>
                    </div>
                    <h5>Location</h5>
                    <label className="editor-location-online">
                        <span>Is Online?</span>
                        <Field name="isOnline" component="input" type="checkbox" />
                    </label>
                    <Field name="location">
                        {({ input }) => (
                            <input type="text" placeholder='Event location' disabled={!!isOnline.input.value} value={!!isOnline.input.value ? "" : (input.value ?? '')} onChange={input.onChange} />
                        )}
                    </Field>
                </div>
            </div>
            <EventDateAndLocationInfo
                isOpened={isOpened}
                startDate={startDate.input.value ?? eventInfo.startDate}
                endDate={endDate.input.value ?? eventInfo.endDate}
                startTime={startTime.input.value ?? eventInfo.startTime}
                endTime={endTime.input.value ?? eventInfo.endTime}
                location={(!!isOnline.input.value ? "online" : location.input.value ?? eventInfo.location)}
            />
        </div >
    )
}
