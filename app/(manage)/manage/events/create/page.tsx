import React from 'react'
import { createClient } from '@/utils/supabase/server'
import dynamic from 'next/dynamic'
const DrawerClient = dynamic(() => import('@/app/components/dashboard/create/drawer/drawer-client'), { ssr: false })
const EventEditor = dynamic(() => import('@/app/components/dashboard/create/editor/editor'), { ssr: false })
const DrawerHeader = dynamic(() => import('@/app/components/dashboard/create/drawer/drawer-header'), { ssr: false })

async function getCategories() {
    const supabase = createClient()
    const { data, error } = await supabase.from("categories").select('*').order('id')
    if (error) throw new Error('Could not find event')
    return data
}

export default async function CreateEvent() {
    const categories = await getCategories()

    return (
        <div className='dashboard_container'>
            <div className="dashboard_container-drawer">
                <DrawerClient />
            </div>
            <div className='dashboard_container-body'>
                <DrawerHeader />
                <EventEditor categories={categories} />
            </div>
        </div>
    )
}
