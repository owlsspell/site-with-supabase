import React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import DashboardHeader from './dashboard-header'
import { redirect } from 'next/navigation'

export default async function DashboardHeaderServer() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/')
    const { data, error } = await supabase.from('profiles').select().eq("id", user.id)
    if (error) return redirect('/')
    return (
        <div className='header_container'>
            <div className='header_logo'><Link href="/">eventbrite </Link></div>
            {!!user && <DashboardHeader {...{ full_name: data[0].name, avatar_url: data[0].avatar_url }} />}
        </div>
    )
}
