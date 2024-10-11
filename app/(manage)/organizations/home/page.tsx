import HelpCenter from '@/app/components/dashboard/home/help-center';
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function DashboardHome() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/')
    return (
        <DashboardLayout title={'Hello, ' + user?.user_metadata.name}>
            <HelpCenter />
        </DashboardLayout>
    )
}
