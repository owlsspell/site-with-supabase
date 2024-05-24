import React from 'react'
import GrayButton from './buttons/gray-button'
import searchIcon from "@/images/icons/search.svg"
import Image from 'next/image'

export default function Header() {
    return (
        <div className='header_container'>
            <div className='header_logo'>eventbrite</div>
            <div className='header_input'>
                <Image src={searchIcon} alt="" width={15} />
                <span>Search</span></div>
            <nav className='header_nav'>
                <GrayButton text="Find Events" />
                <GrayButton text="Create Events" />
                <GrayButton text="Help Centre" />
                <GrayButton text="Log In" />
                <GrayButton text="Sign Up" />
            </nav>
        </div>
    )
}
