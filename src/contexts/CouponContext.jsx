import  { createContext, useContext, useState } from 'react';

const couponContext = createContext();

const  CouponContext = ({ children }) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponId, setCouponId] = useState(null);
    const [discount, setDiscount] = useState(0);

  return (
    <couponContext.Provider value={{ couponCode, setCouponCode, discount, setDiscount ,couponId, setCouponId}}>
      {children}
    </couponContext.Provider>
  );
};

export default CouponContext
export const useCoupon = () => useContext(couponContext)
