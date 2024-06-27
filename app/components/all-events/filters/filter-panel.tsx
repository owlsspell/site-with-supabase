'use client'
import React, { useEffect, useState } from 'react'
import Categories from './categories'
import { dates, price, format, language, currency } from '@/lib/constants'
import { Form, FormSpy } from 'react-final-form'
import RadioOrCheckboxFilter from './radio-or-checkbox-filter'
import { changeFilters } from '@/lib/features/eventsFiltersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import supabase from '@/utils/supabase/client-supabase'


export default function FilterPanel({ categories }: { categories: CategoryType[] }) {
    type FormFields = typeof initialValues
    const dispatch = useAppDispatch()
    const [subcategories, setSubcategories] = useState([])

    const onSubmit = async (values: FormFields) => {
        window.alert(JSON.stringify(values))
    }
    const handleChange = (values: FormFields) => {
        // console.log("validate", values);
        dispatch(changeFilters(values))
        if (values.category.length > 0) getSubcategories(values.category)
        return values
    }
    const getSubcategories = async (category: string) => {
        const result = categories.find(item => item.name === category)
        setSubcategories(result.subcategories)
    }

    console.log('subcategories', subcategories);
    const initialValues = { category: "", date: "", price: "", format: "", language: "", currency: "" }
    return (
        <aside className='filter_panel'>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={handleChange}
                subscription={{ values: true }}
                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        <span className='filter_panel-title'>Filters</span>
                        <div className="filter_section">
                            {values.category.length > 0 ?
                                <>{!!subcategories ?
                                    <RadioOrCheckboxFilter title={`${values.category} categories`} options={subcategories} type="checkbox" />
                                    : <div className='filter_section-title'>{values.category} category</div>}
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
                    </form>)}
            />
        </aside>
    )
}
