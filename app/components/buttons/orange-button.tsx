import React from 'react'

export default function OrangeButton({ text, className }: { text: string, className?: string }) {
    return (
        <a className={'button-orange ' + className}>{text}</a>
    )
}
