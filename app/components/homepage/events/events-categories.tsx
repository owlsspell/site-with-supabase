'use client'
import React, { useState } from 'react'

export default function EventsCategories() {
    const categories = ["All", "For you", "Online", "Today", "Free"]
    const [activeTab, setActiveTab] = useState("All")
    return (
        <ul className='events_navigation'>
            {categories.map(category => <li key={category} className={activeTab === category ? "tab-active" : ""} onClick={() => setActiveTab(category)}>{category}</li>)}
        </ul>
    )
}
