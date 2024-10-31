'use client'
import Image from 'next/image'
import React from 'react'
import searchIcon from "@/images/icons/search.svg"
import { useSearchParams } from 'next/navigation'

export default function HeaderInput() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    return (
        <>
            <button><Image src={searchIcon} alt="" height={17} width={17} /></button>
            <input name="search" type="text" placeholder='Search' defaultValue={search ?? ""} />
        </>
    )
}
