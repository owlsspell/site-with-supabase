import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)
dayjs.extend(timezone)

export default function EventDateAndLocation() {
    const today = useMemo(() => dayjs().format('ddd, D MMM YYYY H:mm z'), [])
    return (
        <div className='editor_title editor_title-flex'>
            <div>
                <h3>Date and time</h3>
                <p>{today}</p>
            </div>
            <hr />
            <div>
                <h3>Location</h3>
                <p>Enter a location</p>
            </div>
        </div>
    )
}
