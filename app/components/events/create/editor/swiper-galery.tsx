'use client'
import Image from 'next/image';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import image1 from "@/images/swiper/pic1_optim.jpeg"
import image2 from "@/images/swiper/pic2_optim.jpeg"
import image3 from "@/images/swiper/pic3_optim.jpeg"

export default function SwiperGalery() {
    const slides = [image1, image2, image3]

    return (
        <>
            <Swiper
                autoplay={true}
                loop={true}
                effect={'fade'}
                modules={[Autoplay, Pagination, EffectFade]}
                pagination={{ type: "bullets", clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {slides.map((slide, i) =>
                    <SwiperSlide key={i}>
                        <div className='swiper_slide'>
                            <Image priority src={slide} alt="" />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className='editor_upload-picture'>
                <div className='editor_upload-picture-text'>
                    <span className='editor_upload-picture-icon'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#3659e3" viewBox="0 0 24 24" color="#3659e3"><path d="M12 4 7 9l1.414 1.414L11 7.829V16h2V7.828l2.586 2.585L16.999 9zm6 12v2H5.999v-2H4v4h16v-4z" clipRule="evenodd"></path></svg> </span>
                    <span>Upload photos <br /> and video</span>
                </div>
            </div>
        </>
    )
}
