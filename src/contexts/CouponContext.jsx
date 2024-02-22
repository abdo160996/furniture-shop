import  { createContext, useContext, useState } from 'react';

const couponContext = createContext();

const  CouponContext = ({ children }) => {
 
  const [coupon,setCoupon] = useState({
    couponCode : "",
    couponId : null,
    discount: 0,
    couponType: null

  })

  return (
    <couponContext.Provider value={{coupon,setCoupon}}>
      {children}
    </couponContext.Provider>
  );
};

export default CouponContext
export const useCoupon = () => useContext(couponContext)
