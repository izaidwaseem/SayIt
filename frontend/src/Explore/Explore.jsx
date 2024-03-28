import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const Explore = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getAllProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Function to construct Cloudinary image URL
  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/searchProducts?searchTerm=${searchTerm}`);
      console.log("Search results:", response.data); // Log the search results to verify
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black py-4">
      <a href="/explore" className="font-bold text-5xl text-[#8e64ff] mt-10">Explore Clothes</a>
      <form className="w-1/3 mx-auto mt-10" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
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
            className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 placeholder-gray-400 text-white"
            placeholder="Search by shirt type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {products.map((product) => (
        <Link to={`/review/${product._id}`} key={product._id} className="flex flex-col items-center justify-center rounded-lg shadow bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800 w-2/6 h-88" >

          <div key={product._id} >
            <img src={getImageUrl(product.imagePath)} className="w-[90%]" alt={product.name} />
            <p className="font-bold text-2xl text-black mb-10">{product.name}</p>
            
          </div>
        </Link>

        ))}
      </div>
     

    </div>
  );
};

export default Explore;

