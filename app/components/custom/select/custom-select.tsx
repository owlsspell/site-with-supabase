'use client'
import React, { useId } from 'react'
import Select from 'react-select';

type Props = {
    options: { value: string, label: string }[],
    className?: string,
    defaultValue?: { label: string, value: string }
}

export default function CustomSelect({ options, className, defaultValue }: Props) {
    return (
        <Select
            id={useId()}
            options={options}
            className={className}
            defaultValue={defaultValue}
        />
    )
}
