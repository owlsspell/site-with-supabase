import UserSettings from '@/app/components/dashboard/settings/user-settings';
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function DashboardSettings({ searchParams }: { searchParams: Record<string, string> | null | undefined; }) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/')
    const { data, error } = await supabase.from('profiles').select().eq("id", user.id)
    if (error) return redirect('/')
    return (
        <DashboardLayout title="Account Settings" subtitle={data[0].name}>
            <UserSettings user={data[0]} searchParams={searchParams} />
        </DashboardLayout>
    )
}
