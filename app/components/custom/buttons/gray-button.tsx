'use client'
import { clearEventData } from '@/lib/features/createEventSlice'
import { useAppDispatch } from '@/lib/hooks'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

export default function GrayButton({ text, className = "", onClick, href, disable = false, isClearEventData = false, type = "link" }: { text: string, className?: string, onClick?: () => void, href?: Url, disable?: boolean, isClearEventData?: boolean, type?: string }) {
    const dispatch = useAppDispatch()
    const clearData = () => dispatch(clearEventData())

    switch (type) {
        case "link": return <Link href={href || ""} className={'button-gray ' + className} onClick={disable ? () => { } : isClearEventData ? clearData : onClick}>{text}</Link>
        case "button": return <button className={'button-gray ' + className} onClick={disable ? () => { } : isClearEventData ? clearData : onClick}>{text}</button>
    }
}
