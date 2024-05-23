import React from 'react'
import GrayButton from './buttons/gray-button'

export default function Header() {
    return (
        <div className='header_container'>
            <div className='header_logo'>eventbrite</div>
            <input className="header_input" type='text' />
            <nav className='header_nav'>
                <GrayButton text="Log in" />
            </nav>
        </div>
    )
}
