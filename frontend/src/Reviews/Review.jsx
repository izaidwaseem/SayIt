import React, { useState, useEffect } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Polarity from "./Polarity";
import StarRating from "./StarRating"; // Import StarRating component

const Review = ({ product }) => {
  const { _id, name, imagePath, description, price, rating, brand, category, reviews: initialReviews } = product;

  const getImageUrl = (publicId) => {
    return `https://res.cloudinary.com/dxi8nz8su/image/upload/v1711106600/${publicId}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0); // State for review rating
  const [positiveReviews, setPositiveReviews] = useState(0);
  const [negativeReviews, setNegativeReviews] = useState(0);
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    const fetchReviewPredictions = async () => {
      if (!_id) {
        console.error('Product ID is not defined');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/predict_stored_reviews/${_id}`);
        const data = await response.json();
        setPositiveReviews(data.positive_reviews);
        setNegativeReviews(data.negative_reviews);
      } catch (error) {
        console.error('Error fetching review predictions:', error);
      }
    };

    fetchReviewPredictions();
  }, [_id]);

  const handleAddReview = async (productId) => {
    try {
      const newReview = {
        reviewer: reviewer,
        review: reviewText,
        rating: reviewRating // Include the rating in the review object
      };
  
      const response = await fetch(`http://localhost:3000/${productId}/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      });
  
      if (response.ok) {
        const updatedProduct = await response.json();
        setReviews([...reviews, updatedProduct.reviews[updatedProduct.reviews.length - 1]]);
        toggleModal();
      } else {
        console.error('Failed to add review:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error.message);
    }
  };
  

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== reviewId));
      } else {
        console.error('Failed to delete review:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Scrollbars style={{ width: "100vw", height: "100vh" }}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 py-4">
        <div className="flex lg:flex-row flex-col w-full justify-between">
          <div className="border border-purple-200 rounded-lg md:w-[48%] w-[100%] p-6 bg-[#FFFFFF] flex flex-col items-center justify-center height-[100%]">
            <img src={getImageUrl(imagePath)} className="w-[100%] h-auto" alt={name} />
          </div>

          <div className="md:w-[48%] w-[100%] p-6 text-lg font-bold text-[#3C0663] bg-gray-200 flex flex-col gap-4 items-start justify-center height-[100%]">
            <p className="font-extrabold text-black size-2xl text-underline ">{name}</p>
            <p>{description}</p>
            <p><span className="text-black">Price: </span> {price}RS</p>
            <p><span className="text-black">Rating: </span> {rating.toFixed(1)}</p>
            <p><span className="text-black">Brand:</span> {brand}</p>
            {category.length > 0 && (
              <p><span className="text-black">Category: </span> {category[0].gender}, {category[0].type}</p>
            )}
            <p className="mt-4">Reviews:</p>
            {reviews.length > 0 && (
              <>
                <p className="text-black text-xl font-semibold ">{reviews[0].reviewer}</p>
                <p>{reviews[0].review}</p>
                <button
                  className="bg-[#3C0663] text-[#F8F6E3] font-semibold py-1 px-3 rounded-[10px] hover:bg-red-600"
                  onClick={() => handleDeleteReview(reviews[0]._id)}
                >
                  Delete
                </button>
              </>
            )}
            <button
              className="bg-transparent text-black font-bold py-2  mr-4"
              onClick={toggleModal}
            >
              read more...
            </button>
            {isOpen && (
              <div className="fixed inset-0 md:w-[50%] w-full flex flex-col items-center z-50">
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
                    {reviews.slice(1).map((review, index) => (
                      <div
                        key={index}
                        className={`bg-transparent text-green-500 p-4 flex flex-col justify-center items-center gap-2 w-11/12`}
                      >
                        <div className="bg-gradient-to-r from-violet-400 to-purple-300 p-4 rounded-md w-full">
                          <p className="text-black uppercase">{review.reviewer}</p>
                          <p className="py-2 text-[black]">{review.review}</p>
                          <button
                            className="w-[50%] bg-[#FFB8CE] text-[#F8F6E3] mt-2 font-semibold align-center py-1 px-3 rounded-full hover:bg-red-600"
                            onClick={() => handleDeleteReview(review._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={() => handleAddReview(product._id)} className=" w-full flex flex-col items-center gap-4">
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
                    <StarRating rating={reviewRating} setRating={setReviewRating} /> {/* Add the StarRating component */}
                    <div className="flex flex-col gap-4 w-[70%]">
                      <button type="submit" className="bg-[#3C0663] text-[#F8F6E3] hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                        Add Review
                      </button>
                      <Polarity positiveReviews={positiveReviews} negativeReviews={negativeReviews} />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default Review;
