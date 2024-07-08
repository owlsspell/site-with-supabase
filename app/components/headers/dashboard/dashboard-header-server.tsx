import React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import DashboardHeader from './dashboard-header'
import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

interface UserType extends User {
    full_name?: string, avatar_url?: string
}
export default async function DashboardHeaderServer() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/')
    const { full_name, avatar_url } = user.user_metadata as UserType
    return (
        <div className='header_container'>
            <div className='header_logo'><Link href="/">eventbrite </Link></div>
            {!!user && <DashboardHeader {...{ full_name, avatar_url }} />}
        </div>
    )
}
