'use client'
import React from 'react'
import Drawer from '@/app/components/dashboard/create/drawer/drawer'
import useWindowSize from '@/hooks/useWindowSizes';

export default function DrawerClient() {
    const { width, domLoaded } = useWindowSize();
    if (width < 960 || !domLoaded) return <></>
    return <Drawer />
}
