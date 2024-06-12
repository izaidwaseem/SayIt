import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
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
      <nav className="border-gray-200 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3">
            <img src="nav.png" className="h-16" alt="Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-black">
              SayIt
            </span>
          </a>
          <button
            onClick={toggleNav}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-md rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-800 hover:bg-gray-700 focus:ring-gray-600"
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
            className={`${
              isNavOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="text-lg flex flex-col p-4 md:p-0 mt-6 border border-gray-500 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link to="/" className="text-black hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-black hover:text-gray-800">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-black hover:text-gray-800">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-black hover:text-gray-800">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-black hover:text-gray-800">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-black hover:text-gray-800">
                  Admin
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-black hover:text-gray-800 focus:outline-none"
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
