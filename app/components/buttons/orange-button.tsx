import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

export default function OrangeButton({ text, className = "", onClick, href }: { text: string, className?: string, onClick?: () => void, href?: Url }) {
    return (
        <Link className={'button-orange ' + className} href={href || ""} onClick={onClick}>{text}</Link>
    )
}
