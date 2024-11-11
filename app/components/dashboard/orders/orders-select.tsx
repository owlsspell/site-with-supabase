'use client'
import React from 'react'
import CustomSelect from '../../custom/select/custom-select'
import { useRouter } from 'next/navigation'

export default function OrdersSelect() {
    const options = ["All", "Past 3 months", "Past 6 months", "Past 12 months"].map(option => ({ value: option === "All" ? 'all' : option.split(" ")[1], label: option }));
    const router = useRouter()
    async function handleChange(value: { value: string }) {
        if (value.value === "all") {
            return router.push('/organizations/orders')
        }
        router.push(`/organizations/orders?filter=${value.value}`)
    }
    return (
        <label>
            <span>Date range</span>
            <CustomSelect options={options} className="dashboard_orders-selectDate" defaultValue={{ label: "All", value: "all" }} handleChange={handleChange} />
        </label>
    )
}
