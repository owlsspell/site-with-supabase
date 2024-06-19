import React from 'react'
import Categories from './filters/categories'

export default function AllEvents({ categories }: { categories: CategoryType[] }) {

    return (
        <div className='search_container'>
            <div className="search_header">
                <h1 className='search_header-title'>Online events</h1>
                <p className='search_header-subtitle'>Search for something you love or check out popular events in your area</p>
            </div>
            <div className='search_body'>
                <aside className='filter_panel'>
                    <span className='filter_panel-title'>Filters</span>
                    <div className="filter_section">
                        <span className='filter_section-title'>Category</span>
                        <Categories categories={categories} />
                    </div>
                </aside>
                <div className='search_results'></div>
            </div>
        </div>
    )
}
