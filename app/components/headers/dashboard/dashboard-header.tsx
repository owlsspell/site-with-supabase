'use client'
import React, { useState } from 'react'
import { ReactComponent as Arrow_down } from "@/images/icons/arrow-down.svg"
import supabase from '@/utils/supabase/client-supabase'
import { useRouter } from 'next/navigation'

export default function DashboardHeader({ full_name, avatar_url }: { full_name?: string | null, avatar_url?: string | null }) {
    const [isOpen, toogleOpen] = useState(false)
    const router = useRouter()
    const handleClick = () => toogleOpen(!isOpen)
    const onLogOut = async () => {
        await supabase.auth.signOut();
        router.push('/')
    };

    return (
        <div className='header_usermenu' onClick={handleClick}>
            {avatar_url && <img src={avatar_url} alt="" />}
            <span>{full_name}</span>
            <Arrow_down className={isOpen ? "dropdown_arrow-open" : ""} />
            <ul className={`nav_list ${isOpen ? 'nav_list-open' : 'nav_list-close'}`}>
                <li className='nav_list-item' onClick={onLogOut}>Log out</li>
            </ul>
        </div>
    )
}
