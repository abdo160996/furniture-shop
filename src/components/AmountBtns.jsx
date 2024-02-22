import React, { useState } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
function AmountBtns({item}) {
 
  return (
    <div className="qty font-Proxima my-2 p-4 w-[160px] h-[52px] flex items-center justify-between border border-neutral-300 rounded-sm">
      <button className="  w-5 h-5" onClick={decrementQty}>
        <TbMinus className="font-bold text-xl" />
      </button>
      <input type="number" value={qty} onChange={handleQty} className="w-10 text-center focus:outline-none" />
      <button className="   w-5 h-5 " onClick={incrementQty}>
        <TbPlus className="font-bold text-xl" />
      </button>
    </div>
  );
}

export default AmountBtns;
