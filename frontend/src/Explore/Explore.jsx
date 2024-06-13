import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiStar } from "react-icons/ci";


const Explore = ({ toggle, setToggle }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Outfitters");
  const [filters, setFilters] = useState({ brands: [], gender: "", type: "" });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) {
      return;
    }

    const fetchData = async () => {
      try {
        const { brands, gender, type } = filters;
        const brandsQuery = brands && brands.length > 0 ? `brands=${brands.join(",")}` : "";
        const genderQuery = gender ? `gender=${gender}` : "";
        const typeQuery = type ? `type=${type}` : "";
        const filterQuery = [brandsQuery, genderQuery, typeQuery].filter(Boolean).join("&");

        const response = await axios.get(
          `http://localhost:3000/filterProducts?page=${page}&perPage=${perPage}&${filterQuery}`
        );

        if (response.data && response.data.products) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
        } else {
          setProducts([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setProducts([]);
        setTotalPages(0);
      }
    };

    fetchData();
  }, [page, perPage, filters]);

  const handleFilterChange = (selectedBrands, selectedGender, selectedType) => {
    setFilters({ brands: selectedBrands, gender: selectedGender, type: selectedType });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/searchProducts?searchTerm=${searchTerm}&page=${page}&perPage=${perPage}`
      );
      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } else {
        setProducts([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error searching products:", error.message);
      setProducts([]);
      setTotalPages(0);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 py-4">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Please log in to access this page.
        </p>
        <Link to="/login">
          <button className="bg-[#E97451] text-white px-4 py-2 rounded-lg hover:bg-[#d9452a] focus:outline-none focus:ring-2 focus:ring-[#E97451] focus:ring-opacity-50 transition duration-300 ease-in-out">
            Log in
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F0F8FF]">


      {toggle && (
        <Sidebar
          brands={["Outfitters", "Engine", "Furor"]}
          onFilterChange={handleFilterChange}
          genderOptions={["Men", "Women"]}
        />
      )}


      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#F0F8FF] py-4">
        <a href="/explore" className="font-bold text-5xl text-[#3C0663] mt-10">
          Explore Clothes
        </a>

        <form className="md:w-1/3 w-[90%] mx-auto mt-10" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-md rounded-lg bg-transparent text-green-500 font-semibold border border-gray-600 focus:outline-none focus:bg-transparent"
              placeholder="Search by shirt type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />

            <button
              type="submit"
              className="absolute end-2.5 bottom-2.5 bg-[#3C0663] text-[#F8F6E3] hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex md:flex-col flex-row items-center justify-center rounded-lg shadow bg-[#E6D0DC] lg:w-2/6 w-[90%] h-88"
              >
                <div className="p-2 w-full h-full flex flex-col items-center justify-center">
                  <Link to={`/review/${product._id}`}>
                    <img
                      src={getImageUrl(product.imagePath)}
                      className="w-[330px] h-[420px] mt-4"
                      alt={product.name}
                    />
                  </Link>
                  <p className="font-bold text-2xl text-[#3C0663] ">{product.name}</p>
                  <p className="text-[#3C0663] underline">{product.brand}</p>
                  <div className="flex flex-row gap-1 w-full items-center justify-center">
                    <p className="text-[#3C0663] py-2">{product.rating}</p>
                    <p><CiStar className="text-2xl text-yellow-600" /></p>
                  </div>
                  <Link to={`/generate/${product._id}`}>
                    <button className="bg-[#3C0663] text-[#F8F6E3] hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                      Get discount code
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}

        </div>
        <div className="w-full items-center justify-center mx-auto mt-10 mb-10">
          <nav aria-label="Page navigation example">
            <div className=" w-full flex flex-row items-center justify-center">
                 <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`px-3 py-2 ml-0 text-zinc-700  bg-[#FFCBCB] leading-tight  border border-gray-300 rounded-l-lg ${page === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700"
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`px-3 py-2 leading-tight text-white bg-[#3C0663] border border-gray-300 rounded-r-lg ${page === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700"
                    }`}
                >
                  Next
                </button>
               </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Explore;
