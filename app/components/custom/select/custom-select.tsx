'use client'
import React, { useId } from 'react'
import Select from 'react-select';

type Props = {
    options: { value: string, label: string }[],
    className?: string,
    defaultValue?: { label: string, value: string },
    handleChange: (newValue: any) => void,
}

export default function CustomSelect({ options, className, defaultValue, handleChange }: Props) {
    return (
        <Select
            instanceId={useId()}
            options={options}
            className={className}
            defaultValue={defaultValue}
            onChange={(newValue) => handleChange(newValue)}
        />
    )
}
