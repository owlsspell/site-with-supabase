import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { isSomeFieldFull } from '@/lib/functions'
import { Field, useField } from 'react-final-form'

dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default function EventDateAndLocation({ isOpened }: { isOpened: boolean }) {
    const today = useMemo(() => dayjs().format('ddd, D MMM YYYY z'), [])
    const startDate = useField('startDate')
    const endDate = useField('endDate')
    const startTime = useField('startTime')
    const endTime = useField('endTime')
    const isOnline = useField('isOnline')
    const location = useField('location')
    return (
        <div className='editor_title editor_title-flex'>
            {isOpened ?
                <div className='editor_date-and-location'>
                    <h3>Date and location</h3>
                    <h5>Date and time</h5>
                    <div className='editor-date'>
                        <div className="time">
                            <div className='time-title'>Start:</div>
                            <Field name="startDate" component="input" type="date" />
                            <Field name="startTime" component="input" type="time" />
                        </div>
                        <div className="time">
                            <div className='time-title'>End:</div>
                            <Field name="endDate" component="input" type="date" />
                            <Field name="endTime" component="input" type="time" />
                        </div>
                    </div>
                    <h5>Location</h5>
                    <label className="editor-location-online">
                        <span>Is Online?</span>
                        <Field name="isOnline" component="input" type="checkbox" />
                    </label>
                    <Field name="location">
                        {({ input }) => (
                            <input type="text" placeholder='Event location' disabled={!!isOnline.input.value} value={!!isOnline.input.value ? "" : input.value} onChange={input.onChange} />
                        )}
                    </Field>
                </div>
                : isSomeFieldFull([startDate.input.value, endDate.input.value, startTime.input.value, endTime.input.value, location.input.value]) || isOnline.input.value ?
                    <>
                        <div>
                            <h3>Date and time</h3>
                            <div>{startDate.input.value === endDate.input.value ?
                                `${startDate.input.value} ${startTime.input.value}-${endTime.input.value}`
                                :
                                <>
                                    <div>{`from: ${startDate.input.value} ${startTime.input.value}`}</div>
                                    <div>{`to: ${endDate.input.value} ${endTime.input.value}`}</div>
                                </>}
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h3>Location</h3>
                            <p>{!!isOnline.input.value ? "Online" : location.input.value}</p>
                        </div>
                    </>
                    :
                    <>
                        <div>
                            <h3>Date and time</h3>
                            <p>{today}</p>
                        </div>
                        <hr />
                        <div>
                            <h3>Location</h3>
                            <p>Enter a location</p>
                        </div>
                    </>
            }
        </div >
    )
}
