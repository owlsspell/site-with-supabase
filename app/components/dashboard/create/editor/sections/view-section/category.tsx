import { isSomeFieldFull } from '@/lib/functions'
import React from 'react'

type PropsType = {
    isOpened: boolean, category: string, subcategory: string[], format: string, language: string[]
}

export default function EventCategoryInfo({ isOpened, category, subcategory, format, language }: PropsType) {
    return (
        <div className={isOpened ? 'hidden' : 'show'}>
            {isSomeFieldFull([category, subcategory, format]) ?
                <>
                    <h3>Category: {category}</h3>
                    {subcategory && <h5>Subcategories: {subcategory.join(',')}</h5>}
                    <h5>Format: {format}</h5>
                    {language && <h5>Languages: {language.join(',')}</h5>}
                </> :
                <>
                    <h3>Event category</h3>
                    <p>Please select an event category to make it easier to find you.</p>
                </>
            }
        </div >
    )
}
