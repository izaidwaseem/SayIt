import React from "react";

const ProductManagement = () => {
  const products = [
    {
      id: 1,
      name: "Black Jeans",
      brand: "Outfitters",
      rating: "4",
      price: 2999,
    },
    {
      id: 2,
      name: "White Pajamas",
      brand: "Engine",
      rating: "4",
      price: 1999,
    },
    {
      id: 3,
      name: "Red Graphic shirt",
      brand: "Breakout",
      rating: "5",
      price: 990,
    },
    {
      id: 4,
      name: "Violet shirt",
      brand: "Outfitters",
      rating: "3.75",
      price: 799,
    },
    {
      id: 5,
      name: "Navy blue jeans jacket",
      brand: "Engine",
      rating: "4",
      price: 999,
    },
  ];

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-md uppercase bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-gray-600 border-b border-black ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Brand
              </th>
              <th scope="col" class="px-6 py-3">
                Rating
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={
                  index % 2 === 0 ? "odd:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400" : "even:bg-gradient-to-r from-red-400 via-gray-300 to-blue-500"
                }
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-gray-900">{product.brand}</td>
                <td className="px-6 py-4 text-gray-900">{product.rating}</td>
                <td className="px-6 py-4 text-gray-900">{product.price}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-semibold text-lg text-white  hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;

/*
 */
