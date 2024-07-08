'use client'
import React, { useMemo } from 'react'
import getIconNavbar from '../../utils/navbar/get-icon-navbar'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NavbarDashboard() {
    const navbar = [{ "name": "Home", "path": "home" }, { "name": "Events", "path": "create" }, { "name": "Orders", "path": "orders" }, { "name": "Reporting", "path": "reporting" }, { "name": "Finance", "path": "finance" }, { "name": "Settings", "path": "settings" }]
    const router = useRouter()
    const pathname = usePathname()
    const getPage = (path: string) => router.push(path.toLowerCase())
    const adress = useMemo(() => pathname.split('/').pop(), [pathname])

    return (
        <aside className='navbar-left'>
            <div className='navbar_logo navbar_item'><Link href="/">e</Link></div>
            {navbar.map(item =>
                <div className={`navbar_item${adress === item.path ? ' navbar_item-active' : ""}`} key={item.name} onClick={() => getPage(item.path)}>
                    {getIconNavbar(item.name)}
                </div>
            )}
        </aside>
    )
}
