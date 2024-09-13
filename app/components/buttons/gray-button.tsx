import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

export default function GrayButton({ text, className = "", onClick, href, disable = false }: { text: string, className?: string, onClick?: () => void, href?: Url, disable?: boolean }) {
    return (
        <Link href={href || ""} className={'button-gray ' + className} onClick={disable ? () => { } : onClick}>{text}</Link>
    )
}
