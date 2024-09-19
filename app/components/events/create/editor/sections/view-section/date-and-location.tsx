import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { isSomeFieldFull } from '@/lib/functions'
import { Field, useField } from 'react-final-form'
import { useAppSelector } from '@/lib/hooks'

dayjs.extend(advancedFormat)
dayjs.extend(timezone)

type PropsType = {
    isOpened: boolean, startDate: string, endDate: string, startTime: string, endTime: string, location: string
}

export default function EventDateAndLocationInfo({ isOpened, startDate, endDate, startTime, endTime, location }: PropsType) {
    const today = useMemo(() => dayjs().format('ddd, D MMM YYYY z'), [])
    return (
        <div className={'editor_title-flex ' + (isOpened ? 'hidden' : 'show')}>
            {isSomeFieldFull([startDate, endDate, startTime, endTime, location]) ?
                <>
                    <div>
                        <h3>Date and time</h3>
                        <div>{startDate === endDate ?
                            `${startDate} ${startTime}-${endTime}`
                            :
                            <>
                                <div>{`from: ${startDate} ${startTime}`}</div>
                                <div>{`to: ${endDate} ${endTime}`}</div>
                            </>}
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h3>Location</h3>
                        <p>{location}</p>
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
        </div>
    )
}
