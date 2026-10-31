import React from 'react'
import Button from '../custom/buttons/button'
import AuthButtonServer from '../auth-button/auth-button-server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import HeaderInput from './header-input'

export default function Header() {

    const findEvents = async (formData: FormData) => {
        'use server'
        const search = String(formData.get('search'))
        if (search === '') redirect('events')
        redirect(`events?search=${search}`)
    }

    return (
        <div className='header_container'>
            <div className='header_logo'><Link href="/">eventbite</Link></div>
            <form action={findEvents} className='header_input'>
                <HeaderInput />
            </form>
            <div className='header_right'>
                <nav className='header_nav'>
                    <Button variant="gray" text="Find Events" href="/events" />
                    <Button variant="gray" text="Create Events" href="/manage/events/create" isClearEventData={true} />
                    {/* <Button variant="gray" text="Help Centre" /> */}
                </nav>
                <AuthButtonServer />
            </div>
        </div>
    )
}
