'use client'
import React from 'react'
import Categories from './categories'
import RadioFilter from './radio-filter'
import { dates } from '@/lib/constants'
import { Form } from 'react-final-form'

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
                        <RadioFilter title="Date" options={dates} />
                    </form>)}
            />
        </aside>
    )
}
