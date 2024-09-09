"use client";
import { RootState, useAppDispatch } from "@/app/redux/store";
import logo from "../../assets/Images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  clearToken,
  getToken,
} from "@/app/redux/feature/LoginSlice/LoginSlice";

function Navbarr() {
  const { token } = useSelector((state: RootState) => state.login);

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch, token]);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function logOut() {
    dispatch(clearToken());
    push("/login");
  }

  return (
    <div className=" w-full  py-2  bg-white text-black  md:fixed relative z-30 border-b-2 shadow-lg border-blue-600  ">
      <nav className="container px-0">
        <div className="flex flex-wrap  items-center justify-between   py-4">
          <h1 className="flex items-center  ">
            <Link
              href="/"
              className={` self-center text-2xl font-semibold whitespace-nowrap  flex`}
            >
              <Image src={logo} width={60} height={60} alt="Logo" />
              Square
            </Link>
          </h1>
          <div className="flex  space-x-3 md:space-x-0 ">
            <button
              type="button"
              className="block items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`absolute top-16 left-0 w-full md:relative md:top-auto md:left-auto md:w-auto md:flex md:items-center md:justify-between transition-transform duration-300 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col font-medium shadow-lg md:shadow-none p-4 md:p-0 mt-4 bg-white rounded-lg  md:space-x-8  md:flex-row md:mt-0 md:border-0 text-black">
              {token ? (
                <>
                  <li>
                    <Link
                      href="/home"
                      className={` ${
                        path === "/home" ? "active" : " "
                      } block py-2   px-3 md:p-0  rounded`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className={` ${
                        path === "/profile" ? "active" : " "
                      } block py-2   px-3 md:p-0  rounded`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <span
                      className="block py-2 px-3 md:p-0  rounded  cursor-pointer  "
                      onClick={() => logOut()}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/"
                      className={` ${
                        path === "/" ? "active" : " "
                      } block py-2   px-3 md:p-0  rounded`}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="login"
                      className={` ${
                        path === "/login" ? "active" : " "
                      } block py-2   px-3 md:p-0  rounded`}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbarr;
