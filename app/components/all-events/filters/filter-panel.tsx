'use client'
import React from 'react'
import Categories from './categories'
import { dates, price, format, language, currency } from '@/lib/constants'
import { Form, FormSpy } from 'react-final-form'
import RadioOrCheckboxFilter from './radio-or-checkbox-filter'

export default function FilterPanel({ categories }: { categories: CategoryType[] }) {
    const onSubmit = async (values: any) => {
        window.alert(JSON.stringify(values))
    }
    const triggerSubmit = async (values: any) => {
        window.alert(JSON.stringify(values))
    }
    const handleChange = (values) => console.log("values", values);
    const validate = (values) => console.log("validate", values);
    const initialValues = { date: "", price: "", format: "", language: "", currency: "" }
    return (
        <aside className='filter_panel'>
            <Form
                onSubmit={onSubmit}
                onChange={handleChange}
                initialValues={initialValues}
                validate={validate}
                subscription={{ values: true }}
                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        {/* {console.log('values', values)} */}
                        <span className='filter_panel-title'>Filters</span>
                        <div className="filter_section">
                            <div className='filter_section-title'>Category</div>
                            <Categories categories={categories} />
                        </div>
                        <RadioOrCheckboxFilter title="Date" options={dates} />
                        <RadioOrCheckboxFilter title="Price" options={price} />
                        <RadioOrCheckboxFilter title="Format" options={format} />
                        <RadioOrCheckboxFilter title="Language" options={language} type="checkbox" />
                        <RadioOrCheckboxFilter title="Currency" options={currency} />
                        {/* <FormSpy
                            onChange={triggerSubmit}
                            subscription={{ values: true, }}
                        /> */}
                    </form>)}
            />
        </aside>
    )
}
