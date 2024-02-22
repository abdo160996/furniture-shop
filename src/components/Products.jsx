import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SectionIntro from "./SectionIntro";
import { Link } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { fetchLandingProducts } from "../api/api";

function Products() {

  const {data : products,isError,isPending} = useQuery({
    queryKey:["landing-products"],
    queryFn:fetchLandingProducts,

  })

  if (isError) {
    return <p>Something went wrong</p>
  }
 
  const productsCards = products?.data.map((product) => <ProductCard key={product.id} product={product} />);
  const skeletonCards = [...Array(8)].map((_, index) => <div key={index} className="skeleton w-50 h-80"></div>);

  
  return (
    <section className="my-20 container px-2">
      <SectionIntro spanText="Check Our Product" h2Text="Crafted with excellent material" />
      
      <div className="products mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        {isPending ? skeletonCards : productsCards}
     

      </div>
      <Link to="/products" className=" px-4  mx-auto mt-8 hover:text-orange transition-colors flex justify-center items-center w-fit">View All Products <TbArrowRight className="ml-2" /></Link>
    </section>
  );
}

export default Products;
