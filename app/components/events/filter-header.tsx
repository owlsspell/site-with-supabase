'use client'
import { useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React, { useMemo } from 'react'
import DarkGrayButton from '../buttons/dark-gray-button'

export default function FilterHeader() {
    const filters = useAppSelector((state: RootState) => state.events.filters)
    const filterCounts = useMemo(() => Object.values(filters).filter((value) => value.length > 0).length, [filters])
    const filtersName = useMemo(() => Object.values(filters).filter((value, index) => value.length > 0), [filters])
    console.log('filtersName', filtersName);
    const handleClick = () => {

    }
    return (
        <>
            {filterCounts === 0 ? "" : <>
                <div className='filter_header-container'>
                    <span>{filterCounts}  filter applied</span>
                    {filtersName.map(name => <DarkGrayButton text={name} key={name} onClick={handleClick} />)}
                </div>
                <hr />
            </>}
        </>
    )
}
