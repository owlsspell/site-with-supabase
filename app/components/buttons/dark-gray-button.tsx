import React from 'react'
import { ReactComponent as Cross } from "@/images/icons/cross.svg";

export default function DarkGrayButton({ text, onClick }: { text: string, onClick?: () => void }) {
    return (
        <a className='button-dark-gray' onClick={onClick}>
            {text}
            <Cross height={25} width={25} />
        </a>
    )
}
