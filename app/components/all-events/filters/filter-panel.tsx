'use client'
import React, { useMemo, useState } from 'react'
import Categories from './categories'
import { dates, price, format, language, currency } from '@/lib/constants'
import { Form, FormSpy } from 'react-final-form'
import RadioOrCheckboxFilter from './radio-or-checkbox-filter'
import { changeFilters } from '@/lib/features/eventsFiltersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'


export default function FilterPanel({ categories }: { categories: CategoryType[] }) {
    type FormFields = typeof initialValues
    const dispatch = useAppDispatch()
    const [subcategories, setSubcategories] = useState([])
    const filters = useAppSelector((state: RootState) => state.events.filters)
    // const memoizedFilters = useMemo(() => filters, [filters])
    const onSubmit = async (values: FormFields) => {
        window.alert(JSON.stringify(values))
    }
    const handleChangeCategory = (name: FormFields) => {
        // console.log("validate", values);
        // dispatch(changeFilters(values))
        console.log('name', name);
        getSubcategories(values.category)
        // return values
    }
    console.log('categories!', categories);
    const getSubcategories = async (category: string) => {
        const result = categories.find(item => item.name === category)
        console.log('result', result);
        setSubcategories(result.subcategories)
    }
    const handleSubmit = (props) => { }

    console.log('subcategories', subcategories);
    const initialValues = { category: "", date: "", price: "", format: "", language: [], currency: "" }
    return (
        <aside className='filter_panel'>
            <form onSubmit={handleSubmit}>
                <span className='filter_panel-title'>Filters</span>
                <div className="filter_section">
                    {filters.category.length > 0 ?
                        <>{!!subcategories ?
                            <RadioOrCheckboxFilter title={`${filters.category} categories`} options={subcategories} type="checkbox" />
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
            {/* )}
            /> */}
        </aside>
    )
}
