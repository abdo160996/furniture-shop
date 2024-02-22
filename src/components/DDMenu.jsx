
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { handleLogout } from '../helpers/logOut';
// import { handleLogout } from './Navbar';


function DDMenu({setShowMenu,trigger}) {
    const { user } = useAuthContext();
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)  ) {
          
            setShowMenu(false);
            
        }

    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[menuRef]);
  return (


    <div ref={menuRef} className="dropdown absolute top-8 right-0 bg-white text-black z-[10]">
               {trigger}
                <ul className="p-2 shadow menu  z-[1] bg-base-100 rounded-box w-52">
                  <li>

                    <Link
                      onClick={() => setShowMenu(false)}
                      to={"/wishlist"}
                      className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                    >
                      WishList
                    </Link>
                  </li>

                  <li>
                  {user ? (
            <button
              onClick={handleLogout}
              className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
            >
              Login
            </Link>
          )}
                  </li>
                </ul>
              </div>
  )
}

export default DDMenu