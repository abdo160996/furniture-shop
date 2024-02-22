import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import CartContext from "./contexts/CartContext.jsx";
import AuthContext from "./contexts/AuthContext.jsx";
import WishListContext from "./contexts/WishListContext.jsx";
import  CouponContext  from "./contexts/CouponContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 1 * 60 * 1000}  }})

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>

  <AuthContext>
    <CartContext>
      <WishListContext>
        <CouponContext>
          <App />
        </CouponContext>
      </WishListContext>
    </CartContext>
  </AuthContext>

  </QueryClientProvider>

  // </React.StrictMode>,
);
