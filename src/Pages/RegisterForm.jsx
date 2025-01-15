import React, { useState } from "react";
import logo from "../assets/Furnique.svg";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../configs/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const validationSchema = yup.object({
  email: yup.string().required("Email is Required").email("Please enter a valid Email"),
  name: yup.string().min(4, "must be at least 4 characters long"),
  password: yup.string().required("Please enter a password").min(6, "must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Please re-type your password")
    .oneOf([yup.ref("password")], "Passwords does not match!"),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const validSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCreds.user, {
        displayName: data.name,
      });

      toast.success("Account created successfully! ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        theme: "light",
      });

      navigate("/login", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already in use", {
            autoClose: 2000,
          });
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-14 h-14" src={logo} alt="logo" />
        
        </a>

        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create and account</h1>
            <form onSubmit={handleSubmit(validSubmit)} className="space-y-4 md:space-y-6 " action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-sm text-gray m-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johndoe"
                />
                {errors.name && <p className="text-sm text-gray m-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <p className="text-sm text-gray m-1">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.confirmPassword && <p className="text-sm text-gray m-1">{errors.confirmPassword.message}</p>}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Login here
                </Link>
              </p>
            </form>
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white  opacity-75">
                <span className="loading loading-infinity loading-lg mx-auto block"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
