import React, { Fragment, useEffect, useRef } from "react";
import { getTotal } from "../contexts/CartContext";
import { useCartContext } from "../contexts/CartContext";
import { TbTrash, TbX } from "react-icons/tb";
import { Link } from "react-router-dom";
function MiniCart({ setShowMiniCart }) {
  const { cart, dispatch } = useCartContext();
  const miniCartRef = useRef();
  function handleRemove(item) {
    dispatch({ type: "remove", payload: item });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
        setShowMiniCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [miniCartRef]);

  return (
    <div ref={miniCartRef} className="mini-cart border border-coolGray rounded-md absolute z-30 animate-fadeInFast  top-16 lg:top-16  right-1  lg:right-3 bg-white shadow-lg  min-w-[350px] p-4 text-white">
      <div className="header flex justify-between items-center mb-4 text-gray shadow-sm p-2">
        <h2 className="font-medium text-lg text-black">Cart</h2>
        <button className="close-btn bg-red-500 rounded-md text-white p-2" onClick={() => setShowMiniCart(false)}>
          <TbX />
        </button>
      </div>
      <ul className="flex flex-col overflow-y-auto max-h-[300px] cart-items ">
        {cart.items.length > 0 &&
          cart.items.map((item, index, arr) => {
            return (
              <Fragment key={item.id}>
                <li className="flex text-gray justify-between items-center rounded-md p-3 bg-neutral-50" data-tip={item.name}>
                  <figure className="flex items-center gap-2">
                    <img src={item.main_image} alt="" className="w-14 h-14 object-cover rounded-md" />

                    <figcaption className="text-sm">
                      <div className="line-clamp-1">{item.name}</div>
                      <div>
                        ${item.price} x {item.qty}
                      </div>
                    </figcaption>
                  </figure>
                  <button className="text-red w-5 h-5 rounded-full flex justify-center items-center bg-red-100" onClick={() => handleRemove(item)}>
                    <TbTrash color="red" />
                  </button>
                </li>
                {index === arr.length - 1 ? "" : <div className="divider divider-success"></div>}
              </Fragment>
            );
          })}
      </ul>
        
      <div className="subtotal text-gray flex justify-between items-center py-2 font-medium">
        <div className="subtotal-title ">Subtotal</div>
        <div className="subtotal-price">${getTotal(cart).totalPrice}</div>
      </div>
      <div className="tax my-2">
        <p className="text-sm text-black/60 font-light">Shipping and sales tax calculated at checkout</p>
      </div>
      <Link to="/cart" onClick={() => setShowMiniCart(false)} className=" mt-6 btn flex items-center justify-center  btn-wide mx-auto text-gray">
        View cart and checkout
      </Link>
    </div>
  );
}

export default MiniCart;
