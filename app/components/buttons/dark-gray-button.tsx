import React from 'react'

export default function DarkGrayButton({ text, onClick }: { text: string, onClick?: () => void }) {
    return (
        <button className='button-dark-gray' onClick={onClick}>{text}</button>
    )
}
