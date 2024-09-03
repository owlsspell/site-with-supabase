'use client'
import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { default as CustomDrawer } from './drawer'

export default function DrawerHeader() {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const closeDrawer = () => {
        setIsOpen(false)
    }

    return (
        <div className='drawer_header'>
            <div className='drawer_header-btn'>
                <button onClick={toggleDrawer}>
                    <i className="ri-menu-line"></i>
                </button>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                customIdSuffix="left-drawer"
                className='drawer_header-sidebar'
            >
                <CustomDrawer closeDrawer={closeDrawer} />
            </Drawer>
        </div>
    )
}
