'use client'
import React, { useState } from 'react'
import Categories from './categories'
import { dates, price, format, language, currency } from '@/lib/constants'
import RadioOrCheckboxFilter from './radio-or-checkbox-filter'
import { useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'

export default function FilterPanel({ categories }: { categories: CategoryType[] }) {
    const [subcategories, setSubcategories] = useState<string[] | []>([])
    const filters = useAppSelector((state: RootState) => state.events.filters)

    const getSubcategories = async (category: string) => {
        const result = categories.find(item => item.name === category)
        if (result?.subcategories === null) return setSubcategories([])
        if (result) setSubcategories(result.subcategories)
    }
    const handleSubmit = () => { }

    return (
        <aside className='filter_panel'>
            <form onSubmit={handleSubmit}>
                <span className='filter_panel-title'>Filters</span>
                <div className="filter_section">
                    {filters.category.length > 0 ?
                        <>{subcategories.length > 0 ?
                            <RadioOrCheckboxFilter name={`${filters.category} categories`} title="subcategory" options={subcategories} type="checkbox" />
                            : <div className='filter_section-title'>{filters.category} category</div>}
                        </>
                        :
                        <>
                            <div className='filter_section-title'>Category</div>
                            <Categories categories={categories} getSubcategories={getSubcategories} />
                        </>
                    }
                </div>
                <RadioOrCheckboxFilter title="Date" options={dates} />
                <RadioOrCheckboxFilter title="Price" options={price} />
                <RadioOrCheckboxFilter title="Format" options={format} />
                <RadioOrCheckboxFilter title="Language" options={language} type="checkbox" />
                <RadioOrCheckboxFilter title="Currency" options={currency} />
            </form>
        </aside>
    )
}
