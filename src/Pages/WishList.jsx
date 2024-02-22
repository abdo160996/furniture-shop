import React from "react";
import { useWishListContext } from "../contexts/WishListContext";
import wishListImg from '../assets/wishlist.svg'
import { Link } from "react-router-dom";
function WishList() {
  const { wishList ,dispatch} = useWishListContext();
  
  return (
    <section className="container font-Proxima">
     
      {wishList.items.length === 0 ? (
        <div className="text-center max-w-md h-screen mt-20 mx-auto">
          <img src={wishListImg} alt="no items in wishlist" className=" object-cover" />
          <h1 className="text-3xl font-bold mt-8 mb-4 ">WishList is Empty</h1>
          <p className="text-xl">Add items to your wishList</p>
          <p className="text-xl ">to see them here</p>
          <Link to="/" className="btn mt-8">Keep Shopping</Link>


        </div>
      ): (
        <><h1 className="text-3xl  text-center py-8">WishList</h1><div className="p-2 md:p-3  max-w-xl mx-auto">

            {wishList.items.map((item) => (
              <div className="item flex gap-4 font-semibold shadow-md border border-coolGray rounded-md p-2">
                <div className="left flex-1 flex  gap-4">
                  <div className="img w-16 h-16 md:w-24 md:h-24 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src={item.main_image} alt="" />
                  </div>
                  <div className="info space-y-2">
                    <h3 className="text-sm md:text-lg ">{item.name}</h3>
                    <p className="font-light">{item.category}</p>
                  </div>
                </div>
                <div className="right">
                  <p className="font-semibold text-sm md:text-xl">${item.price}</p>
                  <button onClick={() => { dispatch({ type: "removeFromList", payload: item }); } } className="text-red-500 py-2">Remove</button>
                </div>
              </div>
            ))}
          </div></>
      )}
     
    </section>
  );
}

export default WishList;
