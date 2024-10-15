import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

export default function OrangeButton({ text, className = "", onClick, href, type = "link" }: { text: string, className?: string, onClick?: () => void, href?: Url, type?: string }) {
    switch (type) {
        case "link": return <Link className={'button-orange ' + className} href={href || ""} onClick={onClick}>{text}</Link>
        case "button": return <button className={'button-orange ' + className} onClick={onClick}>{text}</button>
    }
}
