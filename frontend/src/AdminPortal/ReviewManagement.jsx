import React from "react";
import { useState } from "react";

const ReviewManagement = () => {
  const [toggle, setToggle] = useState(false);
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      date: "2023-03-20",
      content:
        "This product is amazing! I would definitely recommend it to anyone.",
    },
    {
      id: 2,
      author: "Jane Smith",
      date: "2023-03-18",
      content:
        "I had a great experience with this service. The customer support was very helpful.",
    },
    {
      id: 3,
      author: "Alice Johnson",
      date: "2023-03-15",
      content:
        "The quality of the product was not as expected. I would not purchase it again.",
    },
    {
      id: 4,
      author: "Bob Brown",
      date: "2023-03-12",
      content:
        "I am very satisfied with my purchase. The delivery was fast and the product was as described.",
    },
    {
      id: 5,
      author: "Charlie Davis",
      date: "2023-03-10",
      content:
        "The product was okay, but the customer service was not very responsive.",
    },
  ];
  const toggling = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {toggle ? (
        <>
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-transparent text-green-500 p-4 flex flex-col items-center gap-2 w-11/12`}
            >
              <div className="bg-gradient-to-r from-indigo-200 via-red-100 to-yellow-100 p-4 rounded-md w-2/3">
                <p className="text-black">{review.author}</p>
                <p>{review.content}</p>
              </div>
            </div>
          ))}
          <button 
          onClick={toggling}
          className=" bg-orange-600 text-[#F8F6E3] font-semibold p-3  rounded-full hover:bg-[#114232] hover:text-white">Back to Products</button>
        </>
      ) : (
        <>
          <img
            src="red.webp"
            alt="reviews"
            className="w-[25%] h-auto cursor-pointer"
            onClick={toggling}
          />
        
        </>
      )}
    </div>
  );
};

export default ReviewManagement;
