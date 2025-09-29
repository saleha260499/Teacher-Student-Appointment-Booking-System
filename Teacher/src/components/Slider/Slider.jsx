import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
// Images
import Banner1 from '../../assets/images/banner1.jpg'
import Banner2 from '../../assets/images/banner2.jpg'
import Banner3 from '../../assets/images/banner3.jpg'

const Slider = () => {
    const images = [Banner1, Banner2, Banner3]
    return (
        <>
            <Swiper modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                {images.map((d, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={d}
                            alt="banner images"
                            style={{ height: "550px", width: "100%" }}
                        />
                    </SwiperSlide>
                ))}

            </Swiper >
        </>
    )
}

export default Slider