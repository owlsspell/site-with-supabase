import React from 'react'
import GrayButton from '../buttons/gray-button'
import searchIcon from "@/images/icons/search.svg"
import Image from 'next/image'
import AuthButtonServer from '../auth-button/auth-button-server'
import Link from 'next/link'

export default function Header() {

    return (
        <div className='header_container'>
            <div className='header_logo'><Link href="/">eventbrite </Link></div>
            <div className='header_input'>
                <Image src={searchIcon} alt="" height={15} width={15} />
                <span>Search</span></div>
            <nav className='header_nav'>
                <GrayButton text="Find Events" href="/events" />
                <GrayButton text="Create Events" href="/manage/events/create" isClearEventData={true} />
                <GrayButton text="Help Centre" />
            </nav>
            <AuthButtonServer />
        </div>
    )
}
