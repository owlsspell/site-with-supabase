'use client'
import React, { useMemo, useState } from 'react'
import { Field } from 'react-final-form'

export default function RadioOrCheckboxFilter({ title, options, type = "radio" }: { title?: string, options: string[], type?: "radio" | "checkbox" }) {
    const [isOpen, toodleOpen] = useState(false)
    function handleClick() {
        toodleOpen(!isOpen)
    }
    const memoizedOptions = useMemo(() => isOpen || options.length <= 4 ? options : options.slice(0, 4), [isOpen, options])
    return (
        <div className="filter_section">
            <div className='filter_section-title'>{title}</div>
            <ul className='filter-choice-items'>
                {memoizedOptions.map(option =>
                    <li key={option}>
                        <MemoizedField option={option} type={type} />
                    </li>)}
                {options.length >= 4 ? <a className='view_btn' onClick={handleClick}>View more</a> : ""}
            </ul>
        </div>
    )
}

const CustomField = ({ option, type }: { option: string, type: string }) => (
    <label>
        <Field
            name="date"
            type={type}
            component="input"
            value={option}
            id={option}
        />
        <span>{option}</span>
    </label>
)

const MemoizedField = React.memo(CustomField)