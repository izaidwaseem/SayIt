import React, { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="star-rating flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star text-3xl focus:outline-none ${star <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-300"} transition-colors duration-300 ease-in-out hover:shadow-lg`}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
};

export default StarRating;
