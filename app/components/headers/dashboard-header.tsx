import React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ReactComponent as Arrow_down } from "@/images/icons/arrow-down.svg"
import Image from 'next/image'

export default async function DashboardHeader() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    return (
        <div className='header_container'>
            <div className='header_logo'><Link href="/">eventbrite </Link></div>
            <div className='header_usermenu'>
                <img src={session?.user?.user_metadata.avatar_url} alt="" />
                <span>{session?.user?.user_metadata.full_name}</span>
                <Arrow_down />
            </div>
        </div>
    )
}
