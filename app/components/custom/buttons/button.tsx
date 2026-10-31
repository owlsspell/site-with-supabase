'use client'

import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { MouseEventHandler, ReactNode } from 'react'
import { ReactComponent as Cross } from '@/images/icons/cross.svg'
import { clearEventData } from '@/lib/features/createEventSlice'
import { useAppDispatch } from '@/lib/hooks'

export type ButtonVariant = 'orange' | 'gray' | 'dark-gray'
export type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps {
    text?: string
    children?: ReactNode
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    href?: Url
    type?: ButtonType
    variant?: ButtonVariant
    disabled?: boolean
    isClearEventData?: boolean
}

const variantClassNames: Record<ButtonVariant, string> = {
    orange: 'button-orange',
    gray: 'button-gray',
    'dark-gray': 'button-dark-gray',
}

export default function Button({
    text,
    children,
    className = '',
    onClick,
    href,
    type = 'button',
    variant = 'gray',
    disabled = false,
    isClearEventData = false,
}: ButtonProps) {
    const dispatch = useAppDispatch()
    const classNames = `${variantClassNames[variant]} ${className}`

    const handleClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (event) => {
        if (disabled) {
            event.preventDefault()
            return
        }
        if (isClearEventData) dispatch(clearEventData())
        onClick?.(event)
    }

    const content = children ?? text

    if (href) {
        return (
            <Link href={href} className={classNames} onClick={handleClick} aria-disabled={disabled}>
                {content}
                {variant === 'dark-gray' && <Cross height={25} width={25} />}
            </Link>
        )
    }

    return (
        <button
            type={type}
            className={classNames}
            onClick={handleClick}
            disabled={disabled}
        >
            {content}
            {variant === 'dark-gray' && <Cross height={25} width={25} />}
        </button>
    )
}
