import React, { useEffect, useState } from "react";
import SectionIntro from "./SectionIntro";
import data from "../../db.json";
import GridGallery from "./GridGallery";
import { TbBuildingStore } from "react-icons/tb";
import { TbMedal } from "react-icons/tb";
import { TbConfetti } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { request } from "../api/axios";
function Gallery() {
  const [activeTab, setActiveTab] = useState("all");

  const { data: products, isPending,isError } = useQuery({
    queryKey: [`cat-products`, activeTab],
    queryFn: async () => {
      const url = `/products?_limit=6${activeTab !== "all" ? `&status=${activeTab}` : ""}`
      return request({url})
     
    },

    staleTime: 5 * 60 * 1000,
  });

  const handleTabClick = (e) => {
    if (activeTab === e.currentTarget.id) {
      return;
    }
    setActiveTab(e.currentTarget.id);
  };

  return (
    <section className="my-20 container px-2">
      <SectionIntro spanText="Check Our Collection" h2Text="Our Furniture Gallery" />
      <div className="flex  gap-4 my-10 justify-center flex-wrap">
        <button id="all" onClick={handleTabClick} className={`tabs-btn ${activeTab === "all" ? "active-tab" : "border-neutral-200"} `}>
          <TbBuildingStore size={20} />
          All
        </button>

        <button id="best" onClick={handleTabClick} className={` tabs-btn  ${activeTab === "best" ? "active-tab" : "border-neutral-200"}`}>
          <TbMedal size={20} />
          Best Sellers
        </button>

        <button id="new" onClick={handleTabClick} className={` tabs-btn  ${activeTab === "new" ? "active-tab" : "border-neutral-200"}`}>
          <TbConfetti size={20} />
          New Arrivals
        </button>

        <button onClick={handleTabClick} id="sale" className={` tabs-btn  ${activeTab === "sale" ? "active-tab" : "border-neutral-200"}`}>
          <TbDiscount2 size={20} />
          On Sale
        </button>
      </div>
      {/* All Products */}
      <div className="content flex justify-center items-center h-[650px] overflow-hidden">
        
        {isPending ? <span className="loading loading-infinity loading-lg mx-auto block"></span> : isError ? <div>Somethimg went wrong..</div> :<GridGallery products={products.data} />}
      </div>
    </section>
  );
}

export default Gallery;
