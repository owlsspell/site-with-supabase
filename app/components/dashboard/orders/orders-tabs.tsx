'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function OrdersTabs({ active }: { active: string }) {
    const tabs = ["Tickets", "Orders"]
    const [activeTab, setActiveTab] = useState<string>(active ? (active[0].toUpperCase() + active.slice(1)) : "Tickets")
    const router = useRouter()

    async function handleChange(tab: string) {
        setActiveTab(tab)
        router.push(`/organizations/orders?table=${tab.toLowerCase()}`)
    }

    return (
        <>
            {activeTab === "Tickets" ? "Tickets purchased by the user" : "Number of tickets purchased for events created by the user"}
            <div className='dashboard_orders-tabs'>
                {tabs.map(tab => <div className={`dashboard_orders-tab ${activeTab === tab ? "active" : ""}`} key={tab} onClick={() => handleChange(tab)}>{tab}</div>)}
            </div>
        </>
    )
}
