'use client'
import { isSomeFieldFull } from '@/lib/functions'
import React from 'react'
import { Field, useField } from 'react-final-form'

export default function EventTitle({ isOpened }: { isOpened: boolean }) {
    const title = useField('title')
    const summary = useField('summary')
    return (
        <div className='editor_title' >
            <div className={isOpened ? 'show' : 'hidden'}>
                <h1>Event overview</h1>
                <h3>Event title</h3>
                <p>Be clear and descriptive with a title that tells people what your event is about.</p>
                <Field name="title" component="input" />
                <h3>Summary</h3>
                <p>{"Grab people's attention with a short description about your event. Attendees will see this at the top of your event page."}</p>
                <Field name="summary" component="input" />
            </div>
            <div className={isOpened ? 'hidden' : 'show'}>
                {isSomeFieldFull([title.input.value, summary.input.value]) ?
                    <>
                        <h1>{title.input.value}</h1>
                        <p>{summary.input.value}</p>
                    </> :
                    <>
                        <h1>Event title</h1>
                        <p>A short and sweet sentence about your event.</p>
                    </>
                }
            </div>
        </div >
    )
}