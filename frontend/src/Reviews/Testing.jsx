import React from "react";
import Polarity from "./Polarity";

const Test = () => {
  // const { name, imagePath, description, price, rating, brand, category } = product; // Destructure product properties

  const clothingReviews = [
    {
      id: 1,
      user: "Ali",
      review: "This shirt is amazing! Great quality.",
    },
    {
      id: 2,
      user: "Hassan",
      review: "Perfect fit and comfortable to wear.",
    },
    {
      id: 3,
      user: "Zaid",
      review: "Excellent service and fast delivery.",
    },
    {
      id: 4,
      user: "John",
      review:
        "The fit of this jacket is not good. It's too tight around my neck.",
    },
    {
      id: 5,
      user: "Emma",
      review:
        "The color of this skirt is not as expected. It's more of a darker shade than pictured.",
    },
    {
      id: 6,
      user: "Omar",
      review:
        "The material of this shirt is not durable. They easily rip after a few washes.",
    },
    {
      id: 7,
      user: "Sofia",
      review:
        "The size of this coat is too small. I'm a size medium and it barely fits.",
    },
    {
      id: 8,
      user: "Hussain",
      review: "This shirt is amazing! Great quality.",
    },
    {
      id: 9,
      user: "Arif",
      review: "Perfect fit and comfortable to wear.",
    },
    {
      id: 10,
      user: "Saima",
      review: "Excellent service and fast delivery.",
    },
  ];

  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 py-4">
      <div className="flex lg:flex-row flex-col w-full justify-between">
        <div className="w-[48%] p-6 bg-[#FFFFFF] flex flex-col items-center justify-center height-[100%]">
          <img src="./cloth.png" className="w-[100%] h-auto" />
        </div>

        <div className="border border-green-400 rounded-lg w-[48%] p-6 text-lg font-bold text-[#87A922] bg-gray-200 flex flex-col gap-4 items-start justify-center height-[100%]">
          <p className="font-extrabold size-2xl text-underline ">name</p>
          <p>description</p> {/* Use description from props */}
          <p>Price: price</p> {/* Use price from props */}
          <p>Rating: rating</p> {/* Use rating from props */}
          <p>Brand: brand</p> {/* Use brand from props */}
          <p>Category: category</p> {/* Use category from props */}
          <p>Amazing Product</p>
          <button
            className="bg-transparent text-black font-bold py-2 px-4"
            onClick={toggleModal}
          >
            read more...
          </button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
              <div className="bg-white rounded-lg p-8 z-50 overflow-y-auto">
                <div className="flex justify-end">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={toggleModal}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-full flex flex-col items-center overflow-y-auto h-96 ">
                  {clothingReviews.map((review) => (
                    <div
                      key={review.id}
                      className={`bg-transparent  text-green-500 p-4 flex flex-col items-center gap-2 w-11/12`}
                    >
                      <div className="bg-gradient-to-r from-indigo-200 via-red-100 to-yellow-100 p-4 rounded-md w-2/3">
                        <p className="text-black">{review.user}</p>
                        <p>{review.review}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col gap-4 w-[70%]">
                    <button className="mt-2 text-white bg-[#E97451] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">
                      Add Review
                    </button>
                    <Polarity />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
