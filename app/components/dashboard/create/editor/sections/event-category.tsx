import { format as formatConstants, language as languageConstants } from '@/lib/constants'
import { useAppSelector } from '@/lib/hooks';
import React, { useMemo } from 'react'
import { Field, useField } from 'react-final-form'
import Select from 'react-select';
import EventCategoryInfo from './view-section/category';
import { getValueFromOption, getValuesArrayFromOptions } from '@/lib/functions';

export default function EventCategory({ isOpened, categories }: { isOpened: boolean, categories: CategoryType[] }) {
    const category = useField('category')
    const subcategory = useField('subcategory')
    const format = useField('format')
    const language = useField('language')
    const eventInfo = useAppSelector((state) => state.createdEventInfo.eventInfo)

    const handleChangeCategory = (selectedOption: any) => {
        category.input.onChange(selectedOption)
        subcategory.input.onChange(null)
    }

    const handleChangeSubcategory = (selectedOption: any) => {
        subcategory.input.onChange(selectedOption)
    }

    const getSubcategories = (category: any) => {
        const result = categories.find(item => item.name === category.label)
        if (result?.subcategories === null) return []
        if (result) return result.subcategories
    }

    const categoriesList = useMemo(() => categories.map(category => ({ value: category.name, label: category.name })), [categories])

    const subCategories = useMemo(() => {
        if (!category.input.value) return []
        const result = getSubcategories(category.input.value)
        if (!result) return []
        return result.map(category => ({ value: category, label: category }))
    }, [category.input.value])

    const formatsArray = formatConstants.map(item => ({ value: item, label: item }))
    const languageArray = languageConstants.map(item => ({ value: item, label: item }))
    return (
        <div className='editor_title'>
            <div className={isOpened && categoriesList.length > 0 ? 'show' : 'hidden'}>
                <h3>Event category and info</h3>
                <div className='editor_select-category'>
                    <div>
                        <h5>Category</h5>
                        <Field name="category">
                            {({ input }) => (
                                <Select
                                    {...input}
                                    id='category'
                                    value={input.value.value ? input.value : ''}
                                    onChange={handleChangeCategory}
                                    options={categoriesList}
                                />
                            )}
                        </Field>
                    </div>
                    {subCategories.length ? <div>
                        <h5>Subcategory</h5>
                        <Field name="subcategory">
                            {({ input }) => (
                                <Select
                                    {...input}
                                    id='subcategory'
                                    onChange={handleChangeSubcategory}
                                    options={subCategories}
                                    isMulti
                                />
                            )}
                        </Field>
                    </div> : ""}
                    <div>
                        <h5>Format</h5>
                        <Field name="format">
                            {({ input }) => (
                                <Select
                                    {...input}
                                    value={input.value.value ? input.value : ''}
                                    options={formatsArray}
                                />
                            )}
                        </Field>
                    </div>
                    <div>
                        <h5>Language</h5>
                        <Field name="language">
                            {({ input }) => (
                                <Select
                                    {...input}
                                    options={languageArray}
                                    isMulti
                                />
                            )}
                        </Field>
                    </div>
                </div>
            </div>
            <EventCategoryInfo
                isOpened={isOpened}
                category={getValueFromOption(category.input.value) ?? eventInfo.category}
                subcategory={getValueFromOption(category.input.value) === eventInfo.category ? eventInfo.subcategory : getValuesArrayFromOptions(subcategory.input.value)}
                format={getValueFromOption(format.input.value) ?? eventInfo.format}
                language={getValuesArrayFromOptions(language.input.value) ?? language.format}
            />
        </div >
    )
}
