'use client'
import React, { useState } from 'react'
import { Field } from 'react-final-form'

export default function RadioFilter({ title, options }: { title: string, options: string[] }) {
    const [isOpen, toodleOpen] = useState(false)
    function handleClick() {
        toodleOpen(!isOpen)
    }

    const CustomField = ({ option }: { option: string }) => (
        <li key={option}>
            <Field
                name="date"
                type="radio"
                component="input"
                value={option}
                id={option}
            />
            <label htmlFor={option}>{option}</label>
        </li>
    )

    const MemoizedField = React.memo(CustomField)

    return (
        <div className="filter_section">
            <div className='filter_section-title'>{title}</div>
            <ul className='filter-choice-items'>
                {isOpen || options.length <= 4 ?
                    options.map(option =>
                        <li key={option}>
                            <Field
                                name="date"
                                type="radio"
                                component="input"
                                value={option}
                                id={option}
                            />
                            <label htmlFor={option}>{option}</label>
                        </li>
                    ) :
                    options.slice(0, 4).map(option =>
                        <li key={option}>
                            <Field
                                name="date"
                                type="radio"
                                component="input"
                                value={option}
                                id={option}
                            />
                            <label htmlFor={option}>{option}</label>
                        </li>
                    )
                }
                {options.length >= 4 ? <button onClick={handleClick}>View more</button> : ""}
            </ul>
        </div>
    )
}


