'use client'
import { changeFilter } from '@/lib/features/eventsFiltersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React, { useMemo, useState } from 'react'

export default function RadioOrCheckboxFilter({ title, options, type = "radio", name }: { title?: string, options: string[], type?: "radio" | "checkbox", name?: string }) {
    const [isOpen, toodleOpen] = useState(false)

    function handleClick() {
        toodleOpen(!isOpen)
    }
    const memoizedOptions = useMemo(() => isOpen || options.length <= 4 ? options : options.slice(0, 4), [isOpen, options])

    return (
        <div className="filter_section">
            <div className='filter_section-title'>{name || title}</div>
            <ul className='filter-choice-items'>
                {memoizedOptions.map(option =>
                    <li key={option}>
                        <MemoizedField option={option} type={type} title={title?.toLowerCase() || 'unknown-field'} />
                    </li>)}
                {options.length > 4 ? <a className='view_btn' onClick={handleClick}>{isOpen ? "View less" : "View more"}</a> : ""}
            </ul>
        </div>
    )
}

const CustomField = ({ option, type, title }: { option: string, type: string, title: string }) => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector((state: RootState) => state.events.filters)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'checkbox') {
            const { checked } = e.target;
            let filtered = filters[title as keyof typeof filters] as string[]

            checked
                ? filtered = [...filtered, option]
                : filtered = filtered.filter(
                    (item) => item !== option
                );
            return dispatch(changeFilter({ name: title, value: filtered }))
        }
        dispatch(changeFilter({ name: title, value: option }))
    }

    const checked = type === 'checkbox' ? filters[title as keyof typeof filters].includes(option)
        : filters[title as keyof typeof filters] === option

    return (
        <label>
            <input name={title}
                type={type}
                value={option ?? ''}
                checked={checked}
                id={option}
                onChange={handleChange}
            />
            <span>{option}</span>
        </label>
    )
}

const MemoizedField = React.memo(CustomField)