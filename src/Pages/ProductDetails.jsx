import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/RatingStars";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";
import { TbMinus, TbPlus, TbHeart, TbChevronLeft, TbChevronRight } from "react-icons/tb";

// install Swiper's Thumbs component

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import required modules
import { Controller, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useCartContext } from "../contexts/CartContext";

import { useWishListContext } from "../contexts/WishListContext";
import { useQuery } from "@tanstack/react-query";
import { request } from "../api/axios";

function ProductDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperRef, setSwiperRef] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const { state, dispatch } = useCartContext();
  const {wishList,dispatch:wishLishDispatch} = useWishListContext()
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const {data,isPending} = useQuery({
    queryKey:['product-details'],
    queryFn : () =>{
      return request({url:`/products/${id}`})
    },
    select:(res) => {
      let productDetails = res.data
      return  productDetails
    }
  })
 

  const incrementQty = () => {
    setQty((prev) => (prev += 1));
  };
  const decrementQty = () => {
    if (qty - 1 > 0) {
      setQty((prev) => (prev -= 1));
    } else {
      setQty(1);
    }
  };
  const handleQty = (e) => {
    let qty = parseInt(e.target.value);

    if (qty === 0 || isNaN(qty)) {
      setQty(1);
    } else {
      setQty(qty);
    }
  };
  
  if(isPending) {
    return <span className="loading loading-infinity loading-lg mx-auto block min-h-screen"></span> 
  }

  
  const slidesNum = data?.images?.length;
  return (
    <section className="py-20 overflow-hidden bg-white font-Proxima dark:bg-gray-800">
      <div className="container grid grid-cols-1 lg:grid-cols-2 px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="left info order-2 lg:order-1 self-center">
          <h2 className="text-3xl lg:text-5xl font-bold ">{data.name}</h2>
          <div className="price-rating flex gap-4 items-center my-6">
            <p className="text-2xl font-semibold text-orange">${data.price}</p>
            <div className="flex items-center space-x-2">
              <RatingStars rating={data.rating} />
              <p className="text-sm text-gray-500">{data.rating}</p>
            </div>
          </div>
          <div className="despription">
            <p className="text-gray-500 ">{data.description}</p>
          </div>
          {/* <div className="options my-8">
            <div className="colors flex items-center gap-3">
            <label htmlFor="red">
                <input id="red" name="color" type="radio" className="h-0 w-0 opacity-0 peer"/>
                <span className="check w-5 h-5 rounded-full relative flex justify-center items-center peer-checked:after:flex bg-red-500 after:absolute after:bg-white after:w-2 after:h-2 after:rounded-full after:hidden after:content-['']"></span>
                </label>

               
              <div className="w-6 h-6 rounded-full bg-black">
                
              </div>
              <div className="w-6 h-6 rounded-full bg-red-500"></div>
              <div className="w-6 h-6 rounded-full bg-blue-500"></div>
            </div>
          </div> */}
          <div className="cart flex items-center gap-6 my-4">
            <div className="qty font-Proxima my-2 p-4 w-[160px] h-[52px] flex items-center justify-between border border-neutral-300 rounded-sm">
              <button className="  w-5 h-5" onClick={decrementQty}>
                <TbMinus className="font-bold text-xl" />
              </button>
              <input type="number" value={qty} onChange={handleQty} className="w-10 text-center focus:outline-none" />
              <button className="   w-5 h-5 " onClick={incrementQty}>
                <TbPlus className="font-bold text-xl" />
              </button>
            </div>
            <button
              onClick={() => dispatch({ type: "add", payload: { ...data, qty } })}
              className="bg-orange whitespace-nowrap transition-all duration-200 ease-in-out h-[52px]  text-white shadow-md shadow-neutral-400 hover:shadow-neutral-200 px-6 py-2 font-semibold rounded-md"
            >
              Add to cart
            </button>
          </div>
          <div className="wishlist my-8 flex items-center gap-6 lg:10">
            <button onClick={()=> wishLishDispatch({type:'addToList',payload:data})} className="flex items-center gap-3 text-gray-500 hover:text-red-500">
              <TbHeart className="w-6 h-6" />
              <p className="text-gray font-semibold whitespace-nowrap">Add to wishlist</p>
            </button>
            <div className="social-share">
              <ul className="flex items-center gap-3">
                <li>
                  <a href="https://www.facebook.com/">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a href="https://www.pinterest.com/">
                    <FaPinterest className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right order-1 lg:order-2 relative">
          <div className="text-right my-3 absolute -top-24 right-2 text-lg font-bold flex items-center  gap-2">
            <span className="text-2xl ">{activeIndex < 10 ? `0${activeIndex + 1}` : activeIndex + 1}</span>
            <span>/</span>
            <span className="opacity-30">{slidesNum < 10 ? `0${slidesNum}` : slidesNum}</span>
          </div>
          <Btns swiper={swiperRef} />

          <div className="slider">
            <Swiper
              className="main-slider"
              slidesPerView={1}
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              spaceBetween={10}
              onSwiper={(swiper) => setSwiperRef(swiper)}
              onSlideChange={() => setActiveIndex(swiperRef.realIndex)}
              modules={[FreeMode, Navigation, Thumbs, Controller]}
            >
              {data?.images?.map((image, index) => (
                <SwiperSlide key={index} className="h-[500px] overflow-hidden rounded-md">
                  <img src={image} alt="" className="object-cover w-full h-full" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper className="my-6 thumbs-slider" onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={"auto"} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs, Controller]}>
              {data?.images?.map((image, index) => (
                <SwiperSlide key={index} className="h-[100px] w-[100px] shadow-md rounded-md overflow-hidden">
                  <img src={image} alt="product-image" className="object-cover w-full h-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

function Btns({ swiper }) {
  return (
    <div className="swiper-btns absolute flex gap-10 items-center  -top-10   right-2 z-10">
      <button className="swiper-prev-btn   " onClick={() => swiper.slidePrev()}>
        <TbChevronLeft className="text-lg" />
      </button>
      <button className="swiper-next-btn  " onClick={() => swiper.slideNext()}>
        <TbChevronRight className="text-lg" />
      </button>
    </div>
  );
}
