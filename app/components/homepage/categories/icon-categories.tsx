'use client'
import React from 'react'
import getIconCategory from '../../utils/categories/get-icon-category'
import { useRouter, useSearchParams } from "next/navigation"

export default function IconCategories({ categories }: { categories: CategoryType[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);

    const handleClick = (name: string) => {
        params.set("category", name.toString());
        router.push(`/events?${params.toString()}`);
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
