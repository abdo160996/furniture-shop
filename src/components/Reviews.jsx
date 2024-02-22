import React, { useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

import "swiper/css";
import ReviewCard from "./ReviewCard";

export function Btns({swiper}) {
  
  return (
    <div className="swiper-btns absolute -top-14 left-4  lg:top-8  lg:left-auto lg:right-8 z-10">
      <button className="swiper-prev-btn btn btn-circle me-2" onClick={() => swiper.current.slidePrev()}>
        <TbArrowLeft />
      </button>
      <button className="swiper-next-btn btn btn-circle" onClick={() => swiper.current.slideNext()}>
        <TbArrowRight />
      </button>
    </div>
  );
}
function Reviews() {
  const swiperRef = useRef(null);
  
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:12 items-center container px-2 my-20">
      <div className="left  relative">
      <Btns swiper={swiperRef} />
        <Swiper slidesPerView={1} onSwiper={(swiper) => (swiperRef.current = swiper)}>
      
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="right  space-y-4 order-first lg:order-last">
        <span className="text-indigo bg-lavender text-center py-2 text-xs md:text-lg px-6">Review</span>
        <h2 className="text-5xl  font-bold">Our Furniture <br /> Review</h2>
        <p className="text-gray font-OpenSans text-sm md:text-lg max-w-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
    </section>
  );
}

export default Reviews;
