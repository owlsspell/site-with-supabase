import React from 'react'

export default function OrangeButton({ text, className = "", onClick }: { text: string, className?: string, onClick?: () => void }) {
    return (
        <a className={'button-orange ' + className} onClick={onClick}>{text}</a>
    )
}
