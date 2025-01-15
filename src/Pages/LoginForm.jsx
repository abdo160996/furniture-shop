import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../configs/firebase";
import logo from "../assets/Furnique.svg";

import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, setUser, loadingUser } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const validSubmit = async (data) => {
    try {
       await signInWithEmailAndPassword(auth, data.email, data.password);

      toast.success("Login successfully");
      navigate(state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      toast.error(error.code);
    }
  };
  if (loadingUser) {
    return <span className="loading loading-infinity loading-lg mx-auto block h-screen"></span>;
  }
  if (user) {
    return <Navigate to={state?.from?.pathname || "/"} replace />;
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
           <img className="w-14 h-14" src={logo} alt="logo" />
        </a>
        <div className="w-full dark:bg-gray-700 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
            <form onSubmit={handleSubmit(validSubmit)} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  {...register("email", { required: "email is required" })}
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors?.email && <p className="text-sm text-gray m-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  {...register("password", { required: "password is required" })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <p className="text-sm text-gray m-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
