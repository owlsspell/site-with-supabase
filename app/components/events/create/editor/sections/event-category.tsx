import { format as formatConstants, language as languageConstants } from '@/lib/constants'
import { isSomeFieldFull } from '@/lib/functions'
import React, { useMemo } from 'react'
import { Field, useField } from 'react-final-form'
import Select from 'react-select';

export default function EventCategory({ isOpened, categories }: { isOpened: boolean, categories: CategoryType[] }) {
    const category = useField('category')
    const subcategory = useField('subcategory')
    const format = useField('format')

    const handleChangeCategory = (selectedOption: any) => {
        category.input.onChange(selectedOption)
        subcategory.input.onChange(null)
    }

    const handleChangeSubcategory = (selectedOption: any) => subcategory.input.onChange(selectedOption)

    const getSubcategories = (category: any) => {
        const result = categories.find(item => item.name === category.label)
        if (result?.subcategories === null) return []
        if (result) return result.subcategories
    }

    const categoriesList = useMemo(() => categories.map(category => ({ value: category.id, label: category.name })), [categories])

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
            {isOpened && categoriesList.length > 0 ? <>
                <h3>Event category and info</h3>
                <div className='editor_select-category'>
                    <div>
                        <h5>Category</h5>
                        <Field name="category">
                            {({ input }) => (
                                <Select
                                    {...input}
                                    id='category'
                                    value={input.value}
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
                                    value={input.value}
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
            </>
                : isSomeFieldFull([category.input.value, subcategory.input.value, format.input.value]) ?
                    <>
                        <h3>{category.input.value}</h3>
                        <h5>{subcategory.input.value.join(',')}</h5>
                        <h5>{format.input.value}</h5>
                    </> :
                    <>
                        <h3>Event category</h3>
                        <p>Please select an event category to make it easier to find you.</p>
                    </>
            }
        </div >
    )
}
