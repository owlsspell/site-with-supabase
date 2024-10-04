'use client'
import { clearEventData } from '@/lib/features/createEventSlice'
import { useAppDispatch } from '@/lib/hooks'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

export default function GrayButton({ text, className = "", onClick, href, disable = false, isClearEventData = false }: { text: string, className?: string, onClick?: () => void, href?: Url, disable?: boolean, isClearEventData?: boolean }) {
    const dispatch = useAppDispatch()
    const clearData = () => dispatch(clearEventData())
    return (
        <Link href={href || ""} className={'button-gray ' + className} onClick={disable ? () => { } : isClearEventData ? clearData : onClick}>{text}</Link>
    )
}
