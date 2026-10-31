import React from 'react'
import banner from "@/images/banner.webp"
import Image from 'next/image'
import Button from '../custom/buttons/button'

export default function FullbleedBanner() {
    return (
        <section className='banner_container'>
            <Image src={banner} alt="" />
            <div className='banner_content'>
                <Button variant="orange" text="Find your next event" />
            </div>
        </section>
    )
}
