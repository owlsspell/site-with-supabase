import Drawer from '@/app/components/events/create/drawer'
import EventEditor from '@/app/components/events/create/editor'
import React from 'react'

export default function CreateEvent() {
    return (
        <div className='create_container'>
            <Drawer />
            <EventEditor />
        </div>
    )
}
