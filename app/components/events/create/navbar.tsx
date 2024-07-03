'use client'
import React from 'react'
import getIconNavbar from '../../utils/navbar/get-icon-navbar'
import { useRouter } from 'next/navigation'

export default function NavbarDashboard() {
    const navbar = [{ "name": "Home", "path": "home" }, { "name": "Events", "path": "create" }, { "name": "Orders", "path": "orders" }, { "name": "Reporting", "path": "reporting" }, { "name": "Finance", "path": "finance" }, { "name": "Settings", "path": "settings" }]
    const router = useRouter()
    const getPage = (path: string) => router.push(path.toLowerCase())

    return (
        <aside className='navbar-left'>
            {navbar.map(item =>
                <div className={`navbar_item ${"activeTab" === item.name && 'navbar_item-active'}`} key={item.name} onClick={() => getPage(item.path)}>
                    {getIconNavbar(item.name)}
                </div>
            )}
        </aside>
    )
}
