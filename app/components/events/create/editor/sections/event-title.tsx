'use client'
import { setRow } from '@/lib/features/eventData'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React from 'react'

export default function EventTitle() {
    const dispatch = useAppDispatch()
    const event = useAppSelector((state: RootState) => state.eventData)
    console.log('event', event);
    const [isInput, toogleInput] = React.useState(false)

    const changeInput = (inputName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRow({ key: inputName, value: e.target.value }))
    }

    return (
        <div className='editor_title' onClick={() => toogleInput(true)}>
            {isInput ? <>
                <h1>Event overview</h1>
                <h3>Event title</h3>
                <p>Be clear and descriptive with a title that tells people what your event is about.</p>
                <input type="text" value={event.title} onChange={(e) => changeInput('title', e)} />
                <h3>Summary</h3>
                <p>{"Grab people's attention with a short description about your event. Attendees will see this at the top of your event page."}</p>
                <input type="text" value={event.summary} onChange={(e) => changeInput('summary', e)} />
            </>
                :
                <>
                    <h1>Event title</h1>
                    <p>A short and sweet sentence about your event.</p>
                </>
            }
        </div>
    )
}
