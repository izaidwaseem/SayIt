import React, { useState } from "react";
import Polarity from "./Polarity";

const Review = ({ product }) => {
  const { name, imagePath, description, price, rating, brand, category, reviews } = product;

  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleAddReview = async (productId) => {
    try {
      // Perform any necessary validation here
  
      // Create a new review object
      const newReview = {
        reviewer: reviewer,
        review: reviewText
      };
  
      // Make a POST request to add the review
      const response = await fetch(`http://localhost:3000/api/${productId}/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Retrieve the updated product data from the response
        const updatedProduct = await response.json();
  
        // Update the state with the updated product data
        // This step depends on how you manage state in your React component
        // For example, if you're using useState hook:
        // setProduct(updatedProduct);
  
        // Close the modal after adding the review
        toggleModal();
      } else {
        // Handle the case where the request fails
        console.error('Failed to add review:', response.statusText);
        // Display an error message to the user or handle the error as needed
      }
    } catch (error) {
      console.error('Error adding review:', error.message);
      // Display an error message to the user or handle the error as needed
    }
  };
  
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 py-4">
      <div className="flex lg:flex-row flex-col w-full justify-between">
        <div className="border border-green-400 rounded-lg w-[48%] p-6 bg-[#FFFFFF] flex flex-col items-center justify-center height-[100%]">
          <img src={getImageUrl(imagePath)} className="w-[100%] h-auto" />
        </div>

        <div className="w-[48%] p-6 text-lg font-bold text-[#87A922] bg-gray-200 flex flex-col gap-4 items-start justify-center height-[100%]">
          <p className="font-extrabold size-2xl text-underline ">{name}</p>
          <p>{description}</p>
          <p>Price: ${price}</p>
          <p>Rating: {rating}</p>
          <p>Brand: {brand}</p>
          <p>Category: {category}</p>
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
              <div className="bg-white rounded-lg p-8 z-50 overflow-y-auto custom-scrollbar">
                <div className="flex justify-end">
                  <button className="text-gray-500 hover:text-gray-700" onClick={toggleModal}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="w-full flex flex-col items-center overflow-y-auto h-96 ">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className={`bg-transparent  text-green-500 p-4 flex flex-col items-center gap-2 w-11/12`}
                    >
                      <div className="bg-gradient-to-r from-indigo-200 via-red-100 to-yellow-100 p-4 rounded-md w-2/3">
                        <p className="text-black">{review.reviewer}</p>
                        <p>{review.review}</p>
                      </div>
                    </div>
                  ))}
                
                </div>
                {/* Form for adding a new review */}
                <form onSubmit={() => handleAddReview(product._id)} className="w-full flex flex-col items-center gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    className="bg-gray-100 rounded-md px-4 py-2 w-2/3"
                    required
                  />
                  <textarea
                    placeholder="Your Review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="bg-gray-100 rounded-md px-4 py-2 w-2/3"
                    rows={4}
                    required
                  />
                  <div className="flex flex-col gap-4 w-[70%]">
                    <button type="submit" className="text-white bg-[#E97451] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                      Add Review
                    </button>
                    <Polarity />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default Review;