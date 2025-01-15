import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import {TbStarFilled} from 'react-icons/tb'
function ProductCard({product}) {

  const {dispatch} = useCartContext()

  function addToCart(){
      dispatch({type:"add",payload:{...product,qty:1}})
      
  }
  return (
    
    <div className="card rounded-sm  shadow-lg p-2  ">
      
      <div className="card-thumb  ">
      <Link to={`/${product.category}/${product.id}`}>
        <figure className="rounded-none relative">
          <img src={product?.main_image} alt="product image" className="" />
          
          <span className="absolute text-sm bg-black flex items-center gap-1 text-yellow-400 px-2 py-1 rounded-sm top-2 right-2"> <TbStarFilled/> {product?.rating}</span>
          <button className="absolute " >
           
          </button>
        </figure>
        </Link>
        <button onClick={addToCart} className="text-orange text-xs md:text-lg flex items-center gap-4 py-2 mx-auto my-3 ">
          <svg width="24" className="w-5 h-5 md:w-6 md:h-6" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="solar:bag-4-linear">
              <g id="Group">
                <path
                  id="Vector"
                  d="M3.79399 12.03C4.33099 9.342 4.59999 8 5.48699 7.134C5.65092 6.97444 5.82824 6.82924 6.01699 6.7C7.03999 6 8.40999 6 11.15 6H12.853C15.592 6 16.961 6 17.983 6.7C18.173 6.83 18.35 6.976 18.513 7.135C19.401 8 19.67 9.343 20.207 12.029C20.978 15.885 21.364 17.813 20.476 19.179C20.316 19.427 20.128 19.656 19.916 19.862C18.75 21 16.785 21 12.853 21H11.15C7.21699 21 5.25099 21 4.08499 19.862C3.87402 19.6557 3.68655 19.4266 3.52599 19.179C2.63799 17.813 3.02399 15.885 3.79599 12.029L3.79399 12.03Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path id="Vector_2" d="M15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z" fill="currentColor" />
                <path id="Vector_3" d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z" fill="currentColor" />
                <path
                  id="Vector_4"
                  d="M9 6V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
            </g>
          </svg>
          Add to cart
        </button>
      </div>
    
      <div className="content">
        <p className=" text-gray text-xs md:text-lg mb-2 line-clamp-1">{product.name}</p>
        <h3 className=" font-medium text-xs md:text-base">${product.price}</h3>
      </div>
    </div>
    
  );
}

export default ProductCard;
