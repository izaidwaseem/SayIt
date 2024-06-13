import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";



const Navbar = ({setToggle}) => {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, call API to invalidate session, etc.)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="border-gray-200 bg-[#310055]">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto p-2">
          <a className="flex items-center space-x-3">

            {location.pathname === '/explore' && (
              <GiHamburgerMenu
                className="mt-2 ml-2 text-4xl cursor-pointer text-white font-extrabold"
                onClick={() => setToggle(prevToggle => !prevToggle)}/>
            )}
            <img src="nav.png" className="h-16" alt="Logo" />


            <Link to="/" className="self-center cursor-pointer text-2xl font-bold whitespace-nowrap text-white">
                  SayIt
                </Link>
             </a>
          <button
            onClick={toggleNav}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-md rounded-lg md:hidden focus:outline-none focus:ring-2 text-white hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
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
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${isNavOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="text-lg text-white flex flex-col p-4 md:p-0 mt-6 border border-gray-500 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link to="/" className=" hover:text-[#DC97FF]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#DC97FF]">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/login" className=" hover:text-[#DC97FF]">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className=" hover:text-[#DC97FF]">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/pricing" className=" hover:text-[#DC97FF]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/admin" className=" hover:text-[#DC97FF]">
                  Admin
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-[#DC97FF] focus:outline-none"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
