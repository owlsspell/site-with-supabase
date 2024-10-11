'use server'
import React from 'react'
import FilterPanel from './filters/filter-panel'
import FilterHeader from '../dashboard/filter-header'
import EventsListServer from '../events/search-events-page/events-list-server'
import { FiltersType } from '@/lib/features/eventsFiltersSlice'

export default async function AllEvents({ categories, searchParams }: { categories: CategoryType[], searchParams: FiltersType }) {

    return (
        <div className='search_container'>
            <div className="search_header">
                <h1 className='search_header-title'>Online events</h1>
                <p className='search_header-subtitle'>Search for something you love or check out popular events in your area</p>
            </div>
            <div className='search_body'>
                <FilterPanel categories={categories} />
                <div className='search_results'>
                    <FilterHeader />
                    <EventsListServer searchParams={searchParams} />
                </div>
            </div>
        </div>
    )
}