'use client'
import React, { useId } from 'react'
import Select from 'react-select';

type Props = {
    options: { value: string, label: string }[],
    className?: string,
    selectedValue?: { label: string, value: string },
    handleChange: (newValue: any) => void,
}

export default function CustomSelect({ options, className, selectedValue, handleChange }: Props) {
    return (
        <Select
            instanceId={useId()}
            options={options}
            className={className}
            value={selectedValue}
            onChange={(newValue) => handleChange(newValue)}
        />
    )
}
