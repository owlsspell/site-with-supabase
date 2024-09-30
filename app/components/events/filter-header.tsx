'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React, { useMemo } from 'react'
import DarkGrayButton from '../buttons/dark-gray-button'
import { changeFilter, clearFilter } from '@/lib/features/eventsFiltersSlice'

export default function FilterHeader() {
    const dispatch = useAppDispatch()
    const filters = useAppSelector((state) => state.events.filters)
    const filterCounts = useMemo(() => Object.values(filters).filter((value) => value.length > 0).length, [filters])
    const filtersName = useMemo(() => Object.values(filters).filter((value) => value.length > 0), [filters])

    const handleClick = (name: string) => {
        const filterName = Object.keys(filters).filter(filter => filters[filter as keyof typeof filters] === name)
        dispatch(clearFilter(filterName))
        if (filterName[0] === 'category') dispatch(changeFilter({ name: "subcategory", value: [] }))
    }

    const getButtonText = (text: string | string[]) => {
        if (typeof text === 'string') return text
        if (text.length < 2) return text.join(',')
        else return `${text.slice(0, 2)} ${text.length === 2 ? "" : `+${text.length - 2}`}`
    }
    return (
        <>
            {filterCounts === 0 ? "" : <>
                <div className='filter_header-container'>
                    <span>{filterCounts}  filter applied</span>
                    {filtersName.map(name => <DarkGrayButton text={getButtonText(name)} key={name} onClick={() => handleClick(name)} />)}
                </div>
                <hr />
            </>}
        </>
    )
}
