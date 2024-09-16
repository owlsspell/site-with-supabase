import React from 'react'
import { createClient } from '@/utils/supabase/server'
import dynamic from 'next/dynamic'
const DrawerClient = dynamic(() => import('@/app/components/events/create/drawer/drawer-client'), { ssr: false })
const EventEditor = dynamic(() => import('@/app/components/events/create/editor/editor'), { ssr: false })
const DrawerHeader = dynamic(() => import('@/app/components/events/create/drawer/drawer-header'), { ssr: false })

async function getCategories() {
    const supabase = createClient()
    const { data, error } = await supabase.from("categories").select('*').order('id')
    if (error) throw new Error('Could not find event')
    return data
}

export default async function CreateEvent() {
    const categories = await getCategories()

    return (
        <div className='create_container'>
            <div className="create_container-drawer">
                <DrawerClient />
            </div>
            <div className='create_container-body'>
                <DrawerHeader />
                <EventEditor categories={categories} />
            </div>
        </div>
    )
}
