import React from "react";
import { Link } from "react-router-dom";

function GridGallery({products}) {
 

  const elements = products?.map((product, index) => (
    <Link key={index} to={`/${product.category}/${product.id}`} className={`${index === 2 || index === 3 ? "col-span-2" : ""} ${index === 1 || index === 4 ? "hidden lg:block" : ""} h-[250px] md:h-[300px]`}>
    <div  className={`product-img h-full overflow-hidden`}>
      <img className="w-full h-full object-cover" src={product.main_image} loading="lazy" alt="" />
    </div>
    </Link>
  ));

  return (
    
    <div className="products grid grid-cols-3 lg:grid-cols-4 gap-4  animate-fadein ">
  
    {elements}
    
    
    </div>
  )
 
}

export default GridGallery;
