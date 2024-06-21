'use client'
import React, { useMemo, useState } from 'react'
import getIconCategory from '../../utils/categories/get-icon-category'

export default function Categories({ categories }: { categories: CategoryType[] }) {
    const [isOpen, toodleOpen] = useState(false)
    function handleClick() {
        toodleOpen(!isOpen)
    }
    const memoizedCategories = useMemo(() => isOpen || categories.length <= 4 ? categories : categories.slice(0, 4), [isOpen, categories])

    return (
        <ul className='filter-choice-items'>
            {memoizedCategories.map(category =>
                <li className='filter-category' key={category.id}>{getIconCategory(category.name)} <a>{category.name}</a></li>
            )}
            <a className='view_btn' onClick={handleClick}>View more</a>
        </ul>
    )
}
