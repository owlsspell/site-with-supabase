import React from 'react'
import FilterPanel from './filters/filter-panel'

export default function AllEvents({ categories }: { categories: CategoryType[] }) {

    return (
        <div className='search_container'>
            <div className="search_header">
                <h1 className='search_header-title'>Online events</h1>
                <p className='search_header-subtitle'>Search for something you love or check out popular events in your area</p>
            </div>
            <div className='search_body'>
                <FilterPanel categories={categories} />
                <div className='search_results'></div>
            </div>
        </div>
    )
}
