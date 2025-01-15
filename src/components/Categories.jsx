import React from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/api";



function Categories() {
    const {data : cats ,isPending} = useQuery({queryKey:['categories'],queryFn:fetchCategories})
  if (isPending) {
    return <div>Loading...</div>;
    
  }
  return (
    <section className="my-24 container px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cats.data?.map((cat, index) => (
        <div key={index} className={`cat   flex items-center justify-around ${index === 0 ? "bg-peach" : index === 1 ? "bg-whitesmoke" : "bg-lavender"}`}>
            <div className="cat-info text-black">
              <h3 className="text-xl mb-2 font-medium">{cat.name}</h3>
              <button className="border border-indigo border-solid py-1 px-4">Shop Now</button>
            </div>
            <div className="cat-img">
              <img src={cat.image} alt="" />
            </div>
          </div>
        ))}
        
      
      </div>
    </section>
  );
}

export default Categories;
