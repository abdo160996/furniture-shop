import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { useForm } from "react-hook-form";
import { TbX } from "react-icons/tb";
import { toast } from "react-toastify";
import { request } from "../api/axios";

function AddressForm({ setShowForm, type, address }) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: type === "edit" ? address : {} });

  const queryClient = useQueryClient();

  const { mutate: addAdress ,isPending} = useMutation({
    mutationKey: ["add"],
    mutationFn:  (data) => {
      return request({url:"/addresses",method:"post",data})
    
    },
    onSuccess: () => {
      toast.success("Address added successfully");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      toast.error(`something went wrong!`,{autoClose:2000,hideProgressBar:true} );
      
    },
  });

  const { mutate: editAddress } = useMutation({
    mutationKey: ["edit"],
    mutationFn:  ({ id, data }) => {
      return request({url : `/addresses/${id}`,method:"put",data})
     
    },
    onSuccess: () => {
      toast.success("Address updated successfully");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const validSubmit = (data) => {
    if (type === "new") {
      addAdress(data);
    } else {
      editAddress({ id: address.id, data });
    }

   
  };

  return (
    <>
      <div aria-label="overlay" className="overlay fixed inset-0 bg-black bg-opacity-40  "></div>
      <section className="w-full max-w-xs md:max-w-md lg:max-w-full max-h-[80dvh] lg:max-h-none  overflow-y-auto lg:w-[700px] py-10 px-6 lg:px-10 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg">
        <button onClick={() => setShowForm(false)} type="button" className="close-btn absolute top-5 right-5">
          <TbX />
        </button>

        <form onSubmit={handleSubmit(validSubmit)} className="grid grid-cols-1 lg:grid-cols-4 gap-y-4 lg:gap-y-10 gap-x-4   " action="#">
          <div className="form-group col-span-2">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              {...register("fullName", { required: "Name is required" })}
              type="text"
              id="fullName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-sm text-gray m-1">{errors.fullName.message}</p>}
          </div>
          <div className="form-group col-span-2">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              name="address"
              id="address"
              className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1234 Main St"
            />
            {errors.address && <p className="text-sm text-gray m-1">{errors.address.message}</p>}
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              name="city"
              id="  city"
              placeholder="New York"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.city && <p className="text-sm text-gray m-1">{errors.city.message}</p>}
          </div>
          <div className="form-group col-span-2">
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              State
            </label>
            <input
              {...register("state", { required: "State is required" })}
              type="text"
              name="state"
              id="state"
              placeholder="NY"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.state && <p className="text-sm text-gray m-1">{errors.state.message}</p>}
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country
            </label>
            <select
              {...register("country", { required: "Country is required" })}
              name="country"
              id="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="united states">United States</option>
              <option value="canada">Canada</option>
              <option value="mexico">Mexico</option>
            </select>
            {errors.country && <p className="text-sm text-gray m-1">{errors.country.message}</p>}
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Zip
            </label>
            <input
              {...register("zip", { required: "Zip is required" })}
              type="text"
              name="zip"
              id="zip"
              placeholder="10001"
              className="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {errors.zip && <p className="text-sm text-gray m-1">{errors.zip.message}</p>}
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              {...register("phone", { required: "Phone is required : no spaces : 123-456-789", pattern: /\d{3}-\d{3}-\d{3}/g })}
              type="text"
              name="phone"
              title="123-566-999"
              id="phone"
              placeholder=" 123-456-7890"
              className="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {errors.phone && <p className="text-sm text-gray m-1">{errors.phone.message}</p>}
          </div>
          <div className="form-group col-span-2">
            <label htmlFor="addressType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Type
            </label>
            <select
              {...register("addressType", { required: "address Type is required" })}
              id="type"
              className="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
            </select>

            {errors.addressType && <p className="text-sm text-gray m-1">{errors.addressType.message}</p>}
          </div>

          <div className="form-group col-span-2 lg:col-span-4">
            <button
              disabled={isPending}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddressForm;
