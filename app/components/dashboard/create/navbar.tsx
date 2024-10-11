'use client'
import React, { useMemo } from 'react'
import getIconNavbar from '../../utils/navbar/get-icon-navbar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavbarDashboard() {
    const navbar = [
        { "name": "Home", "path": "home" },
        { "name": "Events", "path": "events", active: ["/manage/events/create"] },
        { "name": "Orders", "path": "orders" },
        { "name": "Reporting", "path": "reporting" },
        { "name": "Finance", "path": "finance" },
        { "name": "Settings", "path": "settings" }]
    const pathname = usePathname()
    const adress = useMemo(() => pathname.split('/').pop(), [pathname])
    return (
        <aside className='navbar-left'>
            <div className='navbar_logo navbar_item'><Link href="/">e</Link></div>
            {navbar.map(item =>
                <Link href={"/organizations/" + item.path} key={item.name}>
                    <div className={`navbar_item${adress === item.path || item.active?.includes(pathname) ? ' navbar_item-active' : ""}`}>
                        {getIconNavbar(item.name)}
                    </div>
                </Link>
            )}
        </aside>
    )
}
