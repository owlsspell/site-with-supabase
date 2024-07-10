'use client'
import React from 'react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import image1 from "@/images/swiper/pic2_optim.jpeg"
import Image from 'next/image';

export default function EventEditor() {
    const slides = ["", "", ""]
    return (
        <div className='editor_body'>
            <div className="editor_section-gray">
                <Swiper
                    autoplay={true}
                    loop={true}
                    modules={[Autoplay, Pagination]}
                    pagination={{ type: "bullets", clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {slides.map((slide, i) => <SwiperSlide key={i}>
                        <div className='swiper_slide'>
                            <Image src={image1} alt="" />
                        </div>
                    </SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    )
}
