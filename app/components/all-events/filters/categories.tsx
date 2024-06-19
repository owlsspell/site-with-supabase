'use client'
import React, { useState } from 'react'
import getIconCategory from '../../utils/categories/get-icon-category'

export default function Categories({ categories }: { categories: CategoryType[] }) {
    const [isOpen, toodleOpen] = useState(false)
    function handleClick() {
        toodleOpen(!isOpen)
    }
    return (
        <ul className='filter-choice-items'>
            {isOpen ?
                categories.map(category =>
                    <li key={category.id}>{getIconCategory(category.name)} <a>{category.name}</a></li>
                ) :
                categories.slice(0, 4).map(category =>
                    <li key={category.id}>{getIconCategory(category.name)} <a>{category.name}</a></li>
                )
            }
            <button onClick={handleClick}>View more</button>
        </ul>
    )
}
