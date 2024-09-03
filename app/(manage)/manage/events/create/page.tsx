import React from 'react'
import Drawer from '@/app/components/events/create/drawer/drawer'
import EventEditor from '@/app/components/events/create/editor/editor'
import { createClient } from '@/utils/supabase/server'
import DrawerHeader from '@/app/components/events/create/drawer/drawer-header'

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
                <Drawer />
            </div>
            <div className='create_container-body'>
                <DrawerHeader />
                <EventEditor categories={categories} />
            </div>
        </div>
    )
}
