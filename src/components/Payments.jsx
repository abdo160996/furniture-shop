import React, { useState } from "react";

function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [methods, setMethods] = useState([
    {
      
      id: 1,
      name: "Visa",
      number:"4234456789190000"
    },
    {
      id: 2,
      name: "MasterCard",
      number:"5234456789176587"
    },
  ]);
  const removeCard = (id) => {
    setMethods(methods.filter((pmMethod) => pmMethod.id !== id));
  };
  return (
    <div>
      <div className="shipping-method font-Proxima text-spaceCadet">
        <p className="font-bold text-lg text-spaceCadet mb-6">Payment Method</p>
        <div className="methods">
          {methods.map((method) => (
            <div key={method.id} className="method flex justify-between items-center font-semibold  px-6 py-4 border border-neutral-100">
              <div className="left flex items-center gap-4">
                <label htmlFor={`${method.name}`} className="label cursor-pointer">
                  <input
                    type="radio"
                    id={`${method.name}`}
                    name="paymentMethod"
                    className="radio checked:bg-pink-500"
                    onChange={() => {
                      setPaymentMethod(method.id);
                    }}
                    checked={paymentMethod === method.id}
                  />
                </label>
                <p className="font-semibold">
                  {method.name} <span className="text-coolGray mx-2">{ method.number.split("").slice(-4).join("").padStart(method.number.length,"* ")}</span>
                </p>
              </div>
              <div className="right">
                <button
                  onClick={() => {
                    removeCard(method.id);
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payments;
