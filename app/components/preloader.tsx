import Image from 'next/image'
import React from 'react'
import preloader from "@/images/loading.gif"

export default function Preloader() {
    return (
        <div className='preloader'>
            <Image src={preloader} alt="preloader" />
        </div>
    )
}
