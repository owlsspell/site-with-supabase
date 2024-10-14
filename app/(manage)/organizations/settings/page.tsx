import UserSettings from '@/app/components/dashboard/settings/user-settings';
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function DashboardSettings() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/')
    return (
        <DashboardLayout title="Organisation Settings" subtitle={user?.user_metadata.name}>
            <UserSettings />
        </DashboardLayout>
    )
}
