'use client'
import React from 'react'
import Categories from './categories'
import { dates, price, format, language, currency } from '@/lib/constants'
import RadioOrCheckboxFilter from './radio-or-checkbox-filter'
import { useAppSelector } from '@/lib/hooks'

export default function FilterPanel({ categories }: { categories: CategoryType[] }) {
    const filters = useAppSelector((state) => state.events.filters)
    const selectedCategory = categories.find((category) => category.name === filters.category)
    const subcategories = selectedCategory?.subcategories ?? []
    return (
        <aside className='filter_panel'>
            <form>
                <span className='filter_panel-title'>Filters</span>
                <div className="filter_section">
                    {!!filters.category && filters.category.length > 0 ?
                        <>{subcategories.length > 0 ?
                            <RadioOrCheckboxFilter name={`${filters.category} categories`} title="subcategory" options={subcategories} type="checkbox" />
                            : <div className='filter_section-title'>{filters.category} category</div>}
                        </>
                        :
                        <>
                            <div className='filter_section-title'>Category</div>
                            <Categories categories={categories} />
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
