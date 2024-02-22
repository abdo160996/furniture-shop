import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
const cartContext = createContext(null);
const storedCartData = JSON.parse(localStorage.getItem("cart"));
const initialState = { items: storedCartData?.items || [], status: "" };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      let oldProduct = state.items.find((product) => product.id === action.payload.id);
      if (oldProduct) {
        let updatedItems = state.items.map((pro) => (pro.id === action.payload.id ? { ...pro, qty: action.payload.qty } : pro));
        return { items: updatedItems, status: "updated" };
      } else return { items: [...state.items, action.payload], status: "added" };

    case "update":
      return { items: state.items.map((pro) => (pro.id === action.payload.id ? { ...pro, qty: action.payload.qty } : pro)), status: "updated" };

    case "remove":
      let newItems = state.items.filter((product) => product.id !== action.payload.id);
      return { items: newItems, status: "removed" };

    default:
      return state;
  }
}

export const getTotal = function (cart, shipping = 0, discount = 0) {
  if (cart.items.length === 0) return { totalPrice: 0, totalItems: 0 };
  let totalPrice = 0;
  let totalItems = 0;
  cart.items?.forEach((item) => {
    totalItems += item.qty;
    totalPrice += item.qty * item.price;
  });
  return { totalPrice: ((totalPrice + shipping) - discount).toFixed(2), totalItems };
};

function CartContext({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (cart.status === "added") {
      toast.success("Added to Cart", { autoClose: 2000, hideProgressBar: true });
    }
    if (cart.status === "removed") {
      toast.error("Removed from Cart", { autoClose: 1000, hideProgressBar: true });
    }
    if (cart.status === "updated") {
      toast.info("Product updated", { autoClose: 1000, hideProgressBar: true });
    }
  }, [cart]);
  return <cartContext.Provider value={{ cart, dispatch }}>{children}</cartContext.Provider>;
}

export default CartContext;

export const useCartContext = () => useContext(cartContext);
