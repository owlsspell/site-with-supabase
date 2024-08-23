import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import { setRow } from '@/lib/features/eventDataSlice'
import { isSomeFieldFull } from '@/lib/functions'

dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default function EventDateAndLocation({ isOpened }: { isOpened: boolean }) {
    const today = useMemo(() => dayjs().format('ddd, D MMM YYYY z'), [])
    const dispatch = useAppDispatch()
    const event = useAppSelector((state: RootState) => state.eventData.dateAndLocation)
    const changeInput = (inputName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputName === 'isOnline') return dispatch(setRow({ section: "dateAndLocation", key: inputName, value: e.target.checked }))
        dispatch(setRow({ section: "dateAndLocation", key: inputName, value: e.target.value }))
    }

    return (
        <div className='editor_title editor_title-flex'>
            {isOpened ?
                <div className='editor_date-and-location'>
                    <h3>Date and location</h3>
                    <h5>Date and time</h5>
                    <div className='editor-date'>
                        <input type="date" value={event.date} onChange={(e) => changeInput('date', e)} />
                        <input type="time" value={event.startTime} onChange={(e) => changeInput('startTime', e)} />
                        <input type="time" value={event.endTime} onChange={(e) => changeInput('endTime', e)} />
                    </div>
                    <h5>Location</h5>
                    <label className="editor-location-online">
                        <span>Is Online?</span>
                        <input type="checkbox" checked={event.isOnline} onChange={(e) => changeInput('isOnline', e)} />
                    </label>
                    <input type="text" placeholder='Event location' disabled={event.isOnline} value={event.isOnline ? "" : event.location} onChange={(e) => changeInput('location', e)} />
                </div>
                : isSomeFieldFull(event) ?
                    <>
                        <div>
                            <h3>Date and time</h3>
                            <p>{event.date} {event.startTime} {event.endTime}</p>
                        </div>
                        <hr />
                        <div>
                            <h3>Location</h3>
                            <p>{event.location}</p>
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
