import React, { useState } from "react";
import magniferIcon from "../assets/magnifer.svg";
import headerImg1 from "../assets/header-imgs/header-1.png";
import headerImg2 from "../assets/header-imgs/header-2.png";
import headerImg3 from "../assets/header-imgs/header-3.png";
import headerImg4 from "../assets/header-imgs/header-4.png";
import amazonLogo from "../assets/brands-logo/amz.png";
import googleLogo from "../assets/brands-logo/google.svg";
import cocaLogo from "../assets/brands-logo/coca.png";
import airBnbLogo from "../assets/brands-logo/airbnb.svg";
import samsung from "../assets/brands-logo/samsung.svg";
import { useNavigate, useSearchParams } from "react-router-dom";

function Header() {
 const [query,setQuery]=useState()
 const navigate = useNavigate()
 const handleSearch =(e) =>  {
  if (e.target.value) {
    setQuery(e.target.value)
  }
 }
  return (
    <header className="header container py-10 flex flex-col gap-20">
      <div className="text">
        <h2 className="text-2xl md:text-5xl lg:text-7xl tracking-tight leading-8 md:leading-10 font-medium text-center text-black">
          Transform Your Space,
          <br /> Elevate Your Style.
        </h2>
        <p className="font-OpenSans text-gray text-sm md:text-xl max-w-[290px] md:max-w-[500px] mx-auto font-normal text-center mt-5">Discover a world of transformative possibilities at our furniture store</p>
      </div>
      <div className="search relative bg-whiteSmoke p-2   md:p-4 max-w-[280px] md:max-w-2xl mx-auto flex   gap-4 justify-center items-center ">
        <label htmlFor="search" className="flex items-center flex-1">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 20C16.4706 20 20.5 15.9706 20.5 11C20.5 6.02944 16.4706 2 11.5 2C6.52944 2 2.5 6.02944 2.5 11C2.5 15.9706 6.52944 20 11.5 20Z" stroke="#A8A8A8" stroke-width="1.5" />
            <path
              d="M22.312 20.975C22.249 21.07 22.136 21.183 21.909 21.409C21.683 21.636 21.569 21.749 21.475 21.812C21.3439 21.8988 21.1961 21.9574 21.0411 21.9838C20.8862 22.0103 20.7273 22.0042 20.5749 21.9658C20.4224 21.9274 20.2796 21.8576 20.1556 21.7608C20.0317 21.6641 19.9293 21.5425 19.855 21.404C19.802 21.304 19.756 21.15 19.665 20.843C19.564 20.508 19.514 20.34 19.504 20.222C19.4907 20.0587 19.513 19.8944 19.5696 19.7406C19.6261 19.5868 19.7153 19.4471 19.8312 19.3312C19.9471 19.2153 20.0868 19.1261 20.2406 19.0696C20.3944 19.013 20.5587 18.9907 20.722 19.004C20.84 19.014 21.007 19.064 21.343 19.164C21.65 19.256 21.803 19.302 21.903 19.356C22.0415 19.4302 22.163 19.5325 22.2597 19.6563C22.3565 19.7802 22.4263 19.9228 22.4648 20.0752C22.5033 20.2276 22.5096 20.3863 22.4833 20.5412C22.457 20.6961 22.3986 20.8439 22.312 20.975Z"
              stroke="#A8A8A8"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <input type="text" onChange={handleSearch} id="search" className="input w-full  bg-transparent focus:outline-none  focus:border-0" placeholder="Search" />
        </label>
        <button onClick={()=> navigate(`/products?search=${query}`)} className="text-sm md:text-xl px-4 md:px-7 py-1 md:py-3 text-whitesmoke bg-orange">Search</button>
      </div>

      <div className="header-imgs flex lg:justify-center gap-6 overflow-x-auto  scrollbar-thumb-red-600 scrollbar-thin scrollbar-track-red-100 ">
        <img src={headerImg2} alt="header2" />
        <img src={headerImg1} alt="header1" />
        <img src={headerImg4} alt="header4" />
        <img src={headerImg3} alt="header3" />
      </div>
      {/* brands */}
      <div className="brands flex lg:justify-center gap-8 lg:gap-[72px] overflow-x-auto  scrollbar-thumb-red-600 scrollbar-thin scrollbar-track-red-100 ">
        <img className="max-w-[80px] md:max-w-[200px] " src={amazonLogo} alt="brand1" />
        <img className="max-w-[80px] md:max-w-[200px] " src={googleLogo} alt="brand2" />
        <img className="max-w-[80px] md:max-w-[200px] " src={cocaLogo} alt="brand3" />
        <img className="max-w-[80px] md:max-w-[200px] " src={airBnbLogo} alt="brand4" />
        <img className="max-w-[80px] md:max-w-[200px] " src={samsung} alt="brand5" />
      </div>
    </header>
  );
}

export default Header;
