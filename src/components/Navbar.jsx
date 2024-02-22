import { useState } from "react";
import logo from "../assets/Furnique.svg";


import { signOut } from "firebase/auth";

import { Link } from "react-router-dom";
import { auth } from "../configs/firebase";
import { toast } from "react-toastify";

import { TbChevronDown, TbChevronUp, TbMenu, TbUser, TbX } from "react-icons/tb";
import { useAuthContext } from "../contexts/AuthContext";
import { getTotal, useCartContext } from "../contexts/CartContext";
import MiniCart from "./MiniCart";
import DDMenu from "./DDMenu";
import { handleLogout } from "../helpers/logOut";

function Navbar() {
  const { cart, dispatch } = useCartContext();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="container-fluid bg-base-100 ">
      <div className="navbar container  h-[80px] ">
        <div className="navbar-start">
          <a className="max-w-4" href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg px-1">
            <li>
              <a>Product</a>
            </li>
            <li>
              <a>Services</a>
            </li>
            <li>
              <a>Article</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          <div className="flex items-start  gap-4 me-2 lg:flex">
            <div className="hover:text-orange transition  ">
              <button onClick={() => setShowMiniCart(true)} className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="solar:bag-4-linear">
                    <g id="Group">
                      <path
                        id="Vector"
                        d="M3.79399 12.03C4.33099 9.342 4.59999 8 5.48699 7.134C5.65092 6.97444 5.82824 6.82924 6.01699 6.7C7.03999 6 8.40999 6 11.15 6H12.853C15.592 6 16.961 6 17.983 6.7C18.173 6.83 18.35 6.976 18.513 7.135C19.401 8 19.67 9.343 20.207 12.029C20.978 15.885 21.364 17.813 20.476 19.179C20.316 19.427 20.128 19.656 19.916 19.862C18.75 21 16.785 21 12.853 21H11.15C7.21699 21 5.25099 21 4.08499 19.862C3.87402 19.6557 3.68655 19.4266 3.52599 19.179C2.63799 17.813 3.02399 15.885 3.79599 12.029L3.79399 12.03Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path id="Vector_2" d="M15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z" fill="currentColor" />
                      <path id="Vector_3" d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z" fill="currentColor" />
                      <path
                        id="Vector_4"
                        d="M9 6V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                  </g>
                </svg>
                <span className="rounded-full flex items-center justify-center bg-blue-400  px-2 w-fit h-6 absolute -top-4 -left-3 text-white">{getTotal(cart).totalItems}</span>
              </button>

              {showMiniCart && <MiniCart setShowMiniCart={setShowMiniCart} />}
            </div>

            <div className="hidden lg:flex relative">
              <button className="user-menu" onClick={() => setShowMenu(pre => !pre)}>
                {showMenu ? <span className="flex items-center"> <TbUser size={22} /> <TbChevronUp /></span> : <span className="flex items-center"> <TbUser size={22} /> <TbChevronDown /></span>}
              </button>

              {showMenu && <DDMenu setShowMenu={setShowMenu}  />}
            </div>

            <div className="drawer drawer-end z-20 lg:hidden">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="drawer-button ">
                  <TbMenu className="text-3xl" />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content relative">
                  {/* Sidebar content here */}
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className=" self-end mb-4 drawer-overlay  cursor-pointer text-right text-2xl">
                    <TbX />
                  </label>

                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <a>Product</a>
                  </li>
                  <li>
                    <a>Services</a>
                  </li>
                  <li>
                    <a>Article</a>
                  </li>
                  <li>
                    <a>About Us</a>
                  </li>
                  <div className="divider"></div>
                  <li>
                    {user ? (
                      <button onClick={handleLogout} className="text-red-500">
                        Logout
                      </button>
                    ) : (
                      <Link to="/login">Login</Link>
                    )}
                  </li>
                  {user && (
                    <li>
                      <Link to="/wishlist">Wishlist</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

