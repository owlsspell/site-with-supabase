'use client'
import React from 'react'
import Categories from './categories'
import { dates, price, format, language, currency } from '@/lib/constants'
import { Form } from 'react-final-form'
import RadioOrCheckboxFilter from './radio-or-checkbox-filter'

export default function FilterPanel({ categories }: { categories: CategoryType[] }) {
    const onSubmit = async values => {
        window.alert(JSON.stringify(values, 0, 2))
    }
    const initialValues = { date: "" }
    return (
        <aside className='filter_panel'>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                // validate={validate}
                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        <span className='filter_panel-title'>Filters</span>
                        <div className="filter_section">
                            <div className='filter_section-title'>Category</div>
                            <Categories categories={categories} />
                        </div>
                        <RadioOrCheckboxFilter title="Date" options={dates} />
                        <RadioOrCheckboxFilter title="Price" options={price} />
                        <RadioOrCheckboxFilter title="Format" options={format} />
                        <RadioOrCheckboxFilter title="Format" options={format} type="checkbox" />
                        <RadioOrCheckboxFilter title="Language" options={language} type="checkbox" />
                        <RadioOrCheckboxFilter title="Currency" options={currency} />
                    </form>)}
            />
        </aside>
    )
}
