'use client'
import React, { useState } from 'react'
import { ReactComponent as Arrow_down } from "@/images/icons/arrow-down.svg"
import supabase from '@/utils/supabase/client-supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { clearEventData } from '@/lib/features/createEventSlice'
import { useAppDispatch } from '@/lib/hooks'

type LinkType = {
    id: number,
    text: string,
    url?: string,
    handleClick?: () => void
}

export default function DashboardHeader({ email, full_name, avatar_url }: { email: string, full_name?: string | null, avatar_url?: string | null }) {
    const [isOpen, toogleOpen] = useState(false)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const handleClick = () => toogleOpen(!isOpen)
    const onLogOut = async () => {
        await supabase.auth.signOut();
        router.push('/')
    };
    const drawerLinks: LinkType[][] = [
        [
            { id: 1, text: "Find Events", url: "/events" },
            {
                id: 2, text: "Create Events", url: "/manage/events/create",
                handleClick: () => dispatch(clearEventData())
            },

        ],
        [
            { id: 1, text: email },
            { id: 2, text: "Account settings", url: "/organizations/settings" },
            { id: 3, text: "Log out", handleClick: onLogOut },
        ]
    ]

    return (
        <div className='header_usermenu' onClick={handleClick}>
            {avatar_url && <img src={avatar_url} alt="" />}
            <span>{full_name}</span>
            <Arrow_down className={isOpen ? "dropdown_arrow-open" : ""} />
            <ul className={`nav_list ${isOpen ? 'nav_list-open' : 'nav_list-close'}`}>
                {drawerLinks.map((links, i) =>
                    <div key={i} className='nav_list-group'>
                        {links.map(link =>
                            <li className={'nav_list-item ' + (link.url || link.handleClick ? "" : "nav_list-item-disabled")} key={link.id} onClick={link.handleClick}>
                                {link.url ? <Link href={link.url}>{link.text}</Link> : link.text}
                            </li>
                        )}
                    </div>
                )}
            </ul>
        </div>
    )
}
