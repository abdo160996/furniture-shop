import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";

import OrderSummary from "../components/OrderSummary";

import AddressForm from "../components/AddressForm";
import { toast } from "react-toastify";

import ShippingMethod from "../components/ShippingMethod";
import Payments from "../components/Payments";
import { TbArrowRight } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAddresses } from "../api/api";
import { request } from "../api/axios";



export function Checkout() {

  const queryClient = useQueryClient()

  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("address");
  const [addressToEdit, setAdressToEdit] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);


  const [type, setType] = useState("");
  
  const {data : addresses,isPending} = useQuery({queryKey:["addresses"],queryFn :fetchAddresses,refetchOnWindowFocus:false})
  const {mutate:deleteAddress,isPending:isDeleting} = useMutation({mutationKey:['delete-address'],mutationFn:(id)=>{
    return request({url:`/addresses/${id}`,method:'delete'})

  },onSuccess : () =>{
    toast.success("Address Deleted!")
    queryClient.invalidateQueries({queryKey:['addresses']})

  }
  
})


  const editAddress = (address) => {
    setAdressToEdit(address);
    setType("edit");
    setShowForm(true);
  };
  const addNewAddress = () => {
    setType("new");
    setShowForm(true);
  };
  const handleTab = (tab) => {
    if (selectedTab === tab) {
      return "";
    } else if (tab === "shipping" && !selectedAddress) {
      toast.error("Please select an address", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else if (tab === "payment" && !shippingMethod) {
      toast.error("Please select a shipping method", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      setSelectedTab(tab);
    }
  };
  const removeAddress = (id) => {
    deleteAddress(id)
  };
 
  let tab = "";
  if (selectedTab === "address") {
    tab = (
      <div className="addresses">

        {addresses?.data?.map((address) => (
          <div key={address.id} className="address flex justify-between font-semibold mb-14">
            <div className="left flex  gap-4">
              <div className="">
                <label htmlFor={`address-${address.id}`} className="label cursor-pointer">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    onChange={() => {
                      setSelectedAddress(address);
                    }}
                    checked={selectedAddress?.id === address.id}
                  />
                </label>
              </div>
              <div className="info space-y-2">
                <h3 className="text-base md:text-xl ">
                  {address.fullName} <span className="mx-2 rounded-md px-2 text-xs text-coolGray border border-coolGray py-1">{address.addressType}</span>
                </h3>
                <p className="font-light">{`${address.address} ${address.city} ${address.state}, ${address.country} ${address.zip}`}</p>
                <p className="text-spaceCadet">
                  <span className="text-coolGray mr-2 text-captalize">Contact - </span> {address.phone}
                </p>
              </div>
            </div>
            <div className="right">
              <div className="btns flex items-center gap-6">
                <button
                  onClick={() => {
                    editAddress(address);
                  }}
                  className="text-spaceCadet"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    removeAddress(address.id);
                  }}
                  disabled={isDeleting && address.id === selectedAddress?.id}
                  className="text-red-500"
                >
                  {isDeleting && address.id === selectedAddress?.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={addNewAddress} className="btn btn-ghost my-4">
          + add new address
        </button>
      </div>
    );
  }
  if (selectedTab === "shipping") {
    tab = <ShippingMethod shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} />;
  }
  if (selectedTab === "payment") {
    tab = <Payments />;
  }

  if (isPending) {
    return <span className="loading loading-infinity loading-lg mx-auto block h-screen"></span>;
  }
  return (
    <div className="container px-2 font-Proxima">
      <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10">
        <div className="left col-span-1 lg:col-span-2">
          <header className="flex gap-4 items-center mt-2 mb-20">
            <div className="flex gap-4 justify-center items-center">
              <button className={`font-bold text-lg ${selectedTab === "address" ? "text-dark" : "text-coolGray"}`} onClick={() => handleTab("address")}>
                Address
              </button>
              <div className="separator">
                <TbArrowRight />
              </div>
              <button className={`font-bold text-lg  ${selectedTab === "shipping" ? "text-dark" : "text-coolGray"}`} onClick={() => handleTab("shipping")}>
                Shipping
              </button>
              <div className="separator">
                <TbArrowRight />
              </div>
              <button className={`font-bold text-lg  ${selectedTab === "payment" ? "text-dark" : "text-coolGray"}`} onClick={() => handleTab("payment")}>
                Payment
              </button>
            </div>
          </header>
          {tab}
        </div>

        <div className="right col-span-1">
          <OrderSummary selectedTab={selectedTab} selectedAddress={selectedAddress} setSelectedTab={setSelectedTab} shippingMethod={shippingMethod} />
        </div>
      </main>
      {showForm && <AddressForm setShowForm={setShowForm} type={type} address={addressToEdit}  />}
    </div>
  );
}

export default Checkout;
