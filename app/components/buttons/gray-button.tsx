import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

export default function GrayButton({ text, onClick, href }: { text: string, onClick?: () => void, href?: Url }) {
    return (
        <Link href={href || ""} className='button-gray' onClick={onClick}>{text}</Link>
    )
}
