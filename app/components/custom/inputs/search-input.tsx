'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchInput({ placeholder = "", className }: { placeholder?: string, className?: string; }) {
    const [input, setInput] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString());
    const pathname = usePathname()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            findEvent()
        }
    }
    const findEvent = async () => {
        if (input.length === 0) {
            params.delete('search')
            router.push(`${pathname}?${params.toString()}`);
            return
        }
        params.set('search', input)
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className={'search_input-container ' + className} >
            <input value={input} onChange={handleChange} onKeyDown={onKeyDown} type="text" placeholder={placeholder} className="search_input" />
            <i className="ri-search-line search_icon" onClick={findEvent}></i>
        </div>
    )
}