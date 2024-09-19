'use client'
import React, { useMemo, useState } from 'react'
import getIconCategory from '../../utils/categories/get-icon-category'
import { changeFilter } from '@/lib/features/eventsFiltersSlice'
import { useAppDispatch } from '@/lib/hooks'

export default function Categories({ categories }: { categories: CategoryType[] }) {
    const [isOpen, toodleOpen] = useState(false)
    const dispatch = useAppDispatch()
    function handleClick() {
        toodleOpen(!isOpen)
    }
    const memoizedCategories = useMemo(() => isOpen || categories.length <= 4 ? categories : categories.slice(0, 4), [isOpen, categories])
    const handleChange = (name: string) => {
        dispatch(changeFilter({ name: "category", value: name }))
    }
    return (
        <ul className='filter-choice-items'>
            {memoizedCategories.map(category =>
                <li className='filter-category' key={category.id}>{getIconCategory(category.name)} <a>
                    <label>
                        <input name="category"
                            type="radio"
                            value={category.name ?? ''}
                            id={category.name}
                            onChange={() => handleChange(category.name)}
                        />
                        <span>{category.name}</span>
                    </label>
                </a></li>
            )}
            {categories.length > 4 ? <a className='view_btn' onClick={handleClick}>{isOpen ? "View less" : "View more"}</a> : ""}
        </ul>
    )
}
