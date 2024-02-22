import React, { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
const wishListContext = createContext([]);
const INITIAL_STATE = {
  items: JSON.parse(localStorage.getItem("WishListItems")) || [],
  status: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "addToList":
      const isExist = state.items.find((item) => item.id === action.payload.id);
      if (isExist) return { ...state, status: "updated" };

      return { items: [action.payload, ...state.items], status: "added" };

    case "removeFromList":
      return { items: state.items.filter((item) => item.id !== action.payload.id), status: "removed" };

    default:
      return state;
  }
}
function WishListContext({ children }) {
  const [wishList, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("WishListItems", JSON.stringify(wishList.items));
  }, [wishList.items]);

  useEffect(() => {
    if (wishList.status === "added") {
      toast.success("Added to WishList", { autoClose: 2000, hideProgressBar: true });
    }
    if (wishList.status === "removed") {
      toast.error("Removed from WishList", { autoClose: 2000, hideProgressBar: true });
    }
    if (wishList.status === "updated") {
      toast.info("Product is already in WishList", { autoClose: 2000, hideProgressBar: true });
    }
  }, [wishList]);

  return <wishListContext.Provider value={{ wishList, dispatch }}>{children}</wishListContext.Provider>;
}

export default WishListContext;
export const useWishListContext = () => useContext(wishListContext);
