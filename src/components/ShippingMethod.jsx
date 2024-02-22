import React, { useState } from "react";

const shippingMethods= [
  {
    id: "shr_1OVGTSBKoxpmhRLNCgX3jtRi",
    name: "Free",
    description: "Free Shipping",
    price: 0,
    estimatedDeliveryDate: "5 - 7 Days",

  },
  {
    id: "shr_1OVGR3BKoxpmhRLN3vO2Cj4M",
    name: "Priority",
    description: "Priority Shipping",
    price: 10,
    estimatedDeliveryDate: "3 - 5 Days",
  },
  {
    id:"shr_1OVGRiBKoxpmhRLNq44Cxh8b",
    name: "Express",
    description: "Express Shipping",
    price: 20,
    estimatedDeliveryDate: "1 - 3 Days",
  },
 
]
function ShippingMethod({shippingMethod,setShippingMethod}) {


  return (
    <div className="shipping-method font-Proxima text-spaceCadet">
      <p className="font-bold text-lg text-spaceCadet mb-6">Shipping Method</p>
      <div className="methods">
        {shippingMethods.map((method) => (
            <div key={method.id} className="method flex justify-between items-center font-semibold  px-6 py-4 border border-neutral-100">
            <div className="left flex items-center gap-4">
              <label htmlFor={`${method.name}`} className="label cursor-pointer">
                <input
                  type="radio"
                  id={`${method.name}`}
                  name="shippingMethod"
                  className="radio checked:bg-pink-500"
                  onChange={() => {
                    setShippingMethod(method);
                  }}
                  checked={shippingMethod?.id === method.id}
                />
              </label>
              <p className="font-semibold">
                {method.name} {method.price !== 0 && `$${method.price}`}<span className="text-coolGray mx-2">{method.description}</span>
              </p>
            </div>
            <div className="right">
              <p className="text-coolGray text-sm">
               <span className="text-spaceCadet">{method.estimatedDeliveryDate}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShippingMethod;
