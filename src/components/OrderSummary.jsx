import React, { useEffect, useState } from "react";
import { getTotal } from "../contexts/CartContext";
import { useCartContext } from "../contexts/CartContext";
import { TbDiscount } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useCoupon } from "../contexts/CouponContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../api/axios";
import axios from "axios";

function OrderSummary({ selectedTab, setSelectedTab, shippingMethod, selectedAddress }) {
  const { cart } = useCartContext();

  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { coupon,setCoupon } = useCoupon();

  const { data, status:couponStatus,isLoading:couponIsLoading } = useQuery({
    queryKey: ["apply-coupon",couponCode],
    queryFn: () => {
      return request({ url: `https://furniture-backend-silk.vercel.app/apply-coupon?coupon=${coupon.couponCode}` });
    },
    enabled: !! coupon.couponCode,
    retry:false,
    refetchOnWindowFocus:false,
    
  });

  const { mutate:redirectToStripe,paymentStatus,isPending:stripeIsLoading, } = useMutation({
    mutationKey: ["payment-intent"],
    mutationFn: () => {
      return request({ url: `https://furniture-backend-silk.vercel.app/create-payment-intent`,method:"post",data : { items: cart.items,
      couponId,
      shippingMethod,} });
    },
    onSuccess:(res) =>{
      window.location.href = res.data?.session_url;
  
    },
    onError:(error) =>{
      showToast(error.message || "something went wrong")
    }
  });

  useEffect(() => {
   
    if (couponStatus === "error") {
      setCoupon(pre =>({...pre,discount:0,couponId:null}))
   
      setMsg('Invalid Coupon Code')
    }
    if(couponStatus === "success") {
      setCoupon(pre =>({...pre,couponType:data?.data?.couponType,discount:parseFloat(data?.data?.discount || coupon.discount),couponId:data?.data?.couponId}))

      setMsg(`🎉 Coupon applied`);
  
     }
  }, [couponStatus,coupon.couponCode]);

  const handleDiscount =  (e) => {
    const couponCode = e.target.value.trim().toLowerCase();
    setCouponCode(couponCode);
  };

  const showToast = (msg) => {
    toast.error(msg, {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  const handleTabs = () => {
    navigate("/checkout");
    switch (selectedTab) {
      case "address":
        selectedAddress ? setSelectedTab("shipping") : showToast("Please add an address");
        break;
      case "shipping":
        shippingMethod ? setSelectedTab("payment") : showToast("Please select a shipping method");
        break;
      case "payment":
        redirectToStripe();
        break;

      default:
        break;
    }
  };
  // const makePayment = async () => {
      

  //     const { session_url } = await response.json();
  //     window.location.href = session_url;
    
  // };
  return (
    <div className="summary p-8 max-w-[380px]  border border-coolGray">
      <h2 className="text-2xl font-bold pb-8">Order Summary</h2>
      <div className="details flex flex-col gap-6">
        <div className="price flex justify-between ">
          <p>Price</p>
          <p>${getTotal(cart).totalPrice}</p>
        </div>

        <div className="shipping flex justify-between">
          <p>Shipping</p>
          <p>${shippingMethod?.price || 0}</p>
        </div>
        <div className="coupon flex justify-between">
          <p>Coupon Applied</p>
          <p>${coupon.discount}</p>
        </div>
        <div className="divider"></div>
        <div className="total flex justify-between">
          <p>TOTAL</p>
          <p className="font-bold">${getTotal(cart, shippingMethod?.price,coupon.discount,coupon.couponType).totalPrice}</p>
        </div>
        <div className="delivery flex-col md:flex-row flex justify-between">
          <p>Estimated Delivery by</p>
          <p className="font-bold">{shippingMethod?.estimatedDeliveryDate}</p>
        </div>
        <div className="coupon-apply flex items-center justify-between p-4 gap-4 w-full border border-coolGray overflow-hidden">
          <input value={coupon.couponCode} onChange={handleDiscount} type="text" placeholder="Coupon Code" className="px-2 border border-none focus:outline-none" />
          <TbDiscount className="w-6 h-6" />
        </div>
        {couponIsLoading ? (<span className="loading loading-circle loading-sm mx-auto block"></span> ) : coupon.couponCode ? <p>{msg}</p> : ""}
      
        <button
          disabled={loading}
          onClick={handleTabs}
          className="bg-orange flex justify-center items-center transition-all duration-200 ease-in-out h-[52px]  text-white shadow-md shadow-neutral-400 hover:shadow-neutral-200 px-10 py-3 font-semibold rounded-md"
        >
          {selectedTab === "address" ? "Continue to shipping" : selectedTab === "shipping" ? "Continue to Payment" : `${stripeIsLoading ? "Processing..." : "Continue to Checkout"}`}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
