import React, { Fragment, useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import cartImg from '../assets/empty_cart.svg'
import { TbDiscount, TbDiscount2 } from "react-icons/tb";
import { TbMinus, TbPlus } from "react-icons/tb";
import { getTotal } from "../contexts/CartContext";

import OrderSummary from "../components/OrderSummary";
import { Link } from "react-router-dom";
function Cart() {
  const { cart, dispatch } = useCartContext();

  function handleRemove(item) {
    dispatch({ type: "remove", payload: item });
  }

  const incrementQty = (id, qty) => {
    dispatch({ type: "update", payload: { id, qty: qty + 1 } });
  };
  const decrementQty = (id, qty) => {
    let validQty = Math.max(1, qty - 1);
    dispatch({ type: "update", payload: { id, qty: validQty } });
  };
  const handleQty = (e, id) => {
  
    let qty = parseInt(e.target.value);
  
    if (qty === 0 || isNaN(qty)) {
      dispatch({ type: "update", payload: { id, qty: 1 } });
    } else {
      dispatch({ type: "update", payload: { id, qty } });
    }
  };
  

  return (
    <div className="container px-2 font-Proxima">
      <main className={` grid grid-cols-1 ${cart.items.length === 0 ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-10 mt-10`}>
        <div className="left col-span-1  lg:col-span-2">
          <header className="flex gap-4 items-center mt-2 mb-10">
            <h1 className="text-3xl font-bold ">Cart</h1>
            <span className="text-lg opacity-30">
              {getTotal(cart).totalItems} ITEMS <span className="mx-2">|</span> ${getTotal(cart).totalPrice}
            </span>
          </header>
          {cart.items.length === 0 ? (
            <div className="empty flex flex-col gap-4 items-center justify-center">
              <h1 className="text-3xl font-bold">Your cart is empty</h1>
              <img src={cartImg} className="max-w-sm" alt="cart is empty" />
              <p className="text-lg opacity-30">Add something to it</p>
              <Link to="/" className="btn btn-primary">Shop Now</Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <Fragment key={item.id}>
                <div className="item flex  font-semibold">
                  <div className="left flex-1 flex  gap-4">
                    <div className="img w-16 h-16 md:w-32 md:h-32 rounded-md overflow-hidden  md:block">
                      <img className="w-full h-full object-cover" src={item.main_image} alt="" />
                    </div>
                    <div className="info space-y-2">
                      <h3 className="text-base md:text-lg ">{item.name}</h3>
                      <p className="text-black">
                        <span className="text-coolGray mr-2 text-captalize">{item.category}</span>
                      </p>
                      {/* Qty Change */}
                      <div className="btns flex items-center gap-6">
                        <div className="qty font-Proxima my-2 p-4  md:w-[150px] h-[52px] flex items-center justify-between border border-neutral-300 rounded-sm">
                          <button className="  w-5 h-5" onClick={() => decrementQty(item.id, item.qty)}>
                            <TbMinus className="font-bold text-xl" />
                          </button>
                          <input type="number" min={1} value={item.qty} onChange={(e) => handleQty(e, item.id)} className="w-10 text-center focus:outline-none" />
                          <button className="   w-5 h-5 " onClick={() => incrementQty(item.id, item.qty)}>
                            <TbPlus className="font-bold text-xl" />
                          </button>
                        </div>
  
                        <button onClick={() => handleRemove(item)} className="text-red-500">
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <p className="font-semibold text-sm mdtext-xl">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
                <div className="divider"></div>
              </Fragment>
            ))
          )}
        
          
        </div>
        {/* right */}
        {cart.items.length > 0 && (
          <div className="right">
          
          <OrderSummary />
        </div>
        )}
        
      </main>
      <div className="offer my-4 border border-blue-300 rounded-md p-5 flex items-center gap-2 max-w-fit bg-violet-100 ">
            <TbDiscount2 className="shrink-0 w-6 h-6" />
            <p className="">10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA</p>
          </div>
    </div>
  );
}

export default Cart;
