'use client'
import React from 'react'
import getIconCategory from '../../utils/categories/get-icon-category'
import { changeFilter } from '@/lib/features/eventsFiltersSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from "next/navigation"

export default function IconCategories({ categories }: { categories: CategoryType[] }) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleClick = (name: string) => {
        dispatch(changeFilter({ name: "category", value: name }))
        router.push('/events')
    }
    return (
        <section className='categories_container'>
            {categories.map(category =>
                <a key={category.id} onClick={() => handleClick(category.name)}>
                    <div className='category_wrapper'>
                        <div className='category_icon'>
                            {getIconCategory(category.name, '#39364f')}
                        </div>
                    </div>
                    <p>{category.name}</p>
                </a>
            )}
        </section>
    )
}
