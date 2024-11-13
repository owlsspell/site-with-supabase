import React from 'react'
import banner from "@/images/banner.webp"
import Image from 'next/image'
import OrangeButton from '../custom/buttons/orange-button'

export default function FullbleedBanner() {
    return (
        <section className='banner_container'>
            <Image src={banner} alt="" />
            <div className='banner_content'>
                <OrangeButton text="Find your next event" />
            </div>
        </section>
    )
}
