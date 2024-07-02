'use client'
import { setActiveTab } from '@/lib/features/eventsFiltersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React from 'react'

export default function EventsCategories() {
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector((state: RootState) => state.events.activeTab)
    const categories = ["All", "Online", "This week", "Today", "Free"]
    const handleClick = (category: string) => dispatch(setActiveTab(category))
    return (
        <ul className='events_navigation'>
            {categories.map(category => <li key={category} className={activeTab === category ? "tab-active" : ""} onClick={() => handleClick(category)}>{category}</li>)}
        </ul>
    )
}
