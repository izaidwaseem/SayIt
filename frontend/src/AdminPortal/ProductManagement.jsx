import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getAllProducts?page=${page}&perPage=10`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md uppercase bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-gray-600 border-b border-black">
            <tr>
              <th scope="col" className="px-6 py-3">Product name</th>
              <th scope="col" className="px-6 py-3">Brand</th>
              <th scope="col" className="px-6 py-3">Rating</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={
                  index % 2 === 0
                    ? "odd:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
                    : "even:bg-gradient-to-r from-red-400 via-gray-300 to-blue-500"
                }
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-blue-800 font-semibold text-md">
                  {product.brand}
                </td>
                <td className="px-6 py-4 text-white">{product.rating} stars</td>
                <td className="px-6 py-4 text-white">{product.price}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="font-semibold text-lg text-white hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-3 py-2 mx-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Previous
        </button>
        <span className="px-3 py-2 mx-2 leading-tight text-gray-700 bg-white border border-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-3 py-2 mx-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;
