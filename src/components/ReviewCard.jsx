import React from "react";
import data from "../../data.json";
import RatingStars from "./RatingStars";
function ReviewCard() {
  return (
    <div className="p-4 lg:p-10 flex flex-col gap-3 lg:gap-7 relative">
      <div className="user-info flex items-center gap-2">
        <img
          className="rounded-full w-6 h-6 object-cover"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <h3 className="text-xs ">John Doe</h3>
      </div>
      <div className="icon absolute -top-3 -z-10 opacity-10  lg:top-auto lg:bottom-6 right-6">
        <svg className="w-40 fill-orange lg:fill-indigo" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            id="&#226;&#128;&#156;"
            d="M3.98985 6.83825L5.78628 6.54758C6.62785 6.54758 7.37232 6.83825 8.01969 7.4196C8.69942 7.96864 9.03928 8.79221 9.03928 9.8903C9.03928 10.9561 8.68323 11.8604 7.97113 12.6032C7.25903 13.346 6.25562 13.7175 4.96089 13.7175C3.69853 13.7175 2.64657 13.233 1.80499 12.2641C0.995789 11.2952 0.591187 10.0518 0.591187 8.53383C0.591187 6.98359 1.17381 5.4495 2.33907 3.93155C3.53669 2.4136 5.23602 1.15403 7.43706 0.152832L7.77692 0.976397C4.73431 2.65583 3.21301 4.35141 3.21301 6.06313C3.21301 6.57988 3.47196 6.83825 3.98985 6.83825ZM14.6713 6.83825L16.4678 6.54758C17.3094 6.54758 18.0538 6.83825 18.7012 7.4196C19.3809 7.96864 19.7208 8.79221 19.7208 9.8903C19.7208 10.9561 19.3647 11.8604 18.6526 12.6032C17.9405 13.346 16.9371 13.7175 15.6424 13.7175C14.38 13.7175 13.3281 13.233 12.4865 12.2641C11.6773 11.2952 11.2727 10.0518 11.2727 8.53383C11.2727 6.98359 11.8553 5.4495 13.0206 3.93155C14.2182 2.4136 15.9175 1.15403 18.1186 0.152832L18.4584 0.976397C15.4158 2.65583 13.8945 4.35141 13.8945 6.06313C13.8945 6.57988 14.1535 6.83825 14.6713 6.83825Z"
          />
        </svg>
      </div>
      <p className="text-sm md:text-lg font-light font-OpenSans text-gray leading-7 max-w-lg">
        I've always been hesitant about buying furniture online, but this website exceeded my expectations. The selection is incredible, offering a wide range of styles to suit any taste.
      </p>
      <div className="user flex justify-between">
        <div className="user-rating flex items-center">
         <RatingStars rating={1.5} />
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
