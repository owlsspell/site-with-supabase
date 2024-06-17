import React from 'react'

export default function GrayButton({ text, onClick }: { text: string, onClick?: () => void }) {
    return (
        <button className='button-gray' onClick={onClick}>{text}</button>
    )
}
