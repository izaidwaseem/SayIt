import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Explore = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedOption, setSelectedOption] = useState("Outfitters");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking the presence of a token in localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) {
      // Redirect or show a message to prompt the user to log in
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getAllProducts?page=${page}&perPage=${perPage}`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [page, perPage]);

  // Pagination handlers
  // const goToPage = (pageNumber) => {
  //   setPage(pageNumber);
  // };

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

  // Function to construct Cloudinary image URL
  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/searchProducts?searchTerm=${searchTerm}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error.message);
    }
  };

  // If the user is not logged in, render a message or login button
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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 py-4">
      <a href="/explore" className="font-bold text-5xl text-[#87A922] mt-10">
        Explore Clothes
      </a>

      <form className="w-1/3 mx-auto mt-10" onSubmit={handleSubmit}>
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
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            type="button"
          >
            {selectedOption}

            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li
                onClick={handleOptionChange}
                className="block px-4 py-2  hover:bg-gray-600 hover:text-white"
              >
                Outfitters
              </li>
              <li
                onClick={handleOptionChange}
                className="block px-4 py-2  hover:bg-gray-600 hover:text-white"
              >
                Furor
              </li>
              <li
                onClick={handleOptionChange}
                className="block px-4 py-2  hover:bg-gray-600 hover:text-white"
              >
                Engine
              </li>
              <li
                onClick={handleOptionChange}
                className="block px-4 py-2  hover:bg-gray-600 hover:text-white"
              >
                Diesel
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-[#E97451] hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/review/${product._id}`}
              key={product._id}
              className="flex flex-col items-center justify-center rounded-lg shadow bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 w-2/6 h-88"
            >
              <div key={product._id}>
                <img
                  src={getImageUrl(product.imagePath)}
                  className="w-[90%]"
                  alt={product.name}
                />
                <p className="font-bold text-2xl text-[#87A922] mb-10">
                  {product.name}
                </p>
                <Link to={`/generate/${product._id}`}>
                  <button className="text-white bg-[#E97451] hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                    Get discount code
                  </button>
                </Link>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="w-1/3 mx-auto mt-10 mb-10">
        <nav aria-label="Pagination">
          <ul className="flex justify-center space-x-4">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`text-[#E97451] ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Prev
              </button>
            </li>
            <li>
              <span className="font-bold">{page}</span>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`text-[#E97451] ${
                  page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Explore;
