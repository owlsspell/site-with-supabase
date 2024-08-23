import { format } from '@/lib/constants'
import { setRow } from '@/lib/features/eventDataSlice'
import { isSomeFieldFull } from '@/lib/functions'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import React, { useMemo, useState } from 'react'
import Select from 'react-select';

export default function EventCategory({ isOpened, categories }: { isOpened: boolean, categories: CategoryType[] }) {
    const dispatch = useAppDispatch()
    const event = useAppSelector((state: RootState) => state.eventData.category)
    const [selectedOption, setSelectedOption] = useState(null)
    const [subcategory, setSubcategory] = useState(null)
    const [selectedFormat, setFormat] = useState(null)

    const handleChangeCategory = (selectedOption: any) => {
        setSelectedOption(selectedOption)
        setSubcategory(null)
        dispatch(setRow({ section: "category", key: "mainCategory", value: selectedOption.label }))
        dispatch(setRow({ section: "category", key: "subCategory", value: null }))
    }
    const handleChangeSubcategory = (selectedOption: any) => {
        setSubcategory(selectedOption)
        const filtered = selectedOption.map((item: any) => item.label)
        dispatch(setRow({ section: "category", key: "subCategory", value: filtered }))
    }
    const handleChangeFormat = (selectedOption: any) => {
        setFormat(selectedOption)
        dispatch(setRow({ section: "category", key: "format", value: selectedOption.label }))
    }

    const getSubcategories = (category: any) => {
        const result = categories.find(item => item.name === category.label)
        if (result?.subcategories === null) return []
        if (result) return result.subcategories
    }
    const options = useMemo(() => categories.map(category => ({ value: category.id, label: category.name })), [categories])
    const subCategories = useMemo(() => {
        if (!selectedOption) return []
        const result = getSubcategories(selectedOption)
        if (!result) return []
        return result.map(category => ({ value: category, label: category }))
    }, [selectedOption])
    const formatsArray = format.map(item => ({ value: item, label: item }))

    return (
        <div className='editor_title'>
            {isOpened && options.length > 0 ? <>
                <h3>Event category and info</h3>
                <div className='editor_select-category'>
                    <div>
                        <h5>Category</h5>
                        <Select
                            value={selectedOption}
                            onChange={handleChangeCategory}
                            options={options}
                        />
                    </div>
                    {subCategories.length ? <div>
                        <h5>Subcategory</h5>
                        <Select
                            value={subcategory}
                            onChange={handleChangeSubcategory}
                            options={subCategories}
                            isMulti
                        />
                    </div> : ""}
                    <div>
                        <h5>Format</h5>
                        <Select
                            value={selectedFormat}
                            onChange={handleChangeFormat}
                            options={formatsArray}
                        />
                    </div>
                </div>
            </>
                : isSomeFieldFull(event) ?
                    <>
                        <h1>{event.mainCategory}</h1>
                        <p>{event.format}</p>
                    </> :
                    <>
                        <h3>Event category</h3>
                        <p>Please select an event category to make it easier to find you.</p>
                    </>
            }
        </div >
    )
}
