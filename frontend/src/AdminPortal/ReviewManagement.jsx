// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminReviewManagement = () => {
//   const [reviews, setReviews] = useState([]);
//   const [filteredReviews, setFilteredReviews] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchReviews = async (page = 1) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/reviews?page=${page}&limit=10`);
//       setReviews(response.data.reviews);
//       setFilteredReviews(response.data.reviews);
//       setTotalPages(response.data.totalPages);
//       setCurrentPage(response.data.currentPage);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReviews(currentPage);
//   }, [currentPage]);

//   const handleApprove = async (reviewId) => {
//     try {
//       await axios.patch(`http://localhost:3000/reviews/${reviewId}/approve`);
//       // Update the state directly
//       const updatedReviews = reviews.map(review => 
//         review._id === reviewId ? { ...review, approved: true } : review
//       );
//       setReviews(updatedReviews);
//       setFilteredReviews(updatedReviews);
//     } catch (error) {
//       console.error("Error approving review:", error);
//     }
//   };

//   const handleReject = async (reviewId) => {
//     try {
//       await axios.patch(`http://localhost:3000/reviews/${reviewId}/reject`);
//       // Update the state directly
//       const updatedReviews = reviews.map(review => 
//         review._id === reviewId ? { ...review, approved: false } : review
//       );
//       setReviews(updatedReviews);
//       setFilteredReviews(updatedReviews);
//     } catch (error) {
//       console.error("Error rejecting review:", error);
//     }
//   };

//   const handleDelete = async (reviewId) => {
//     try {
//       await axios.delete(`http://localhost:3000/reviews/${reviewId}`);
//       // Filter out the deleted review from the state
//       const updatedReviews = reviews.filter(review => review._id !== reviewId);
//       setReviews(updatedReviews);
//       setFilteredReviews(updatedReviews);
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     const filtered = reviews.filter(review => 
//       review.reviewer.toLowerCase().includes(e.target.value.toLowerCase()) || 
//       review.review.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredReviews(filtered);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     fetchReviews(page);
//   };

//   return (
//     <div className="admin-review-management p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Review Management</h2>
//       <input
//         type="text"
//         placeholder="Search reviews"
//         value={searchTerm}
//         onChange={handleSearch}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//       />
//       <div className="reviews-list space-y-4">
//         {filteredReviews.map((review) => (
//           <div key={review._id} className="review-item p-4 bg-white shadow rounded-lg">
//             <p className="mb-2"><strong>Reviewer:</strong> {review.reviewer}</p>
//             <p className="mb-2"><strong>Review:</strong> {review.review}</p>
//             <p className="mb-2"><strong>Product:</strong> {review.productName}</p>
//             <p className="mb-2"><strong>Status:</strong> {review.approved ? "Approved" : "Pending"}</p>
//             <div className="flex space-x-2 mt-2">
//               <button 
//                 onClick={() => handleApprove(review._id)} 
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Approve
//               </button>
//               <button 
//                 onClick={() => handleReject(review._id)} 
//                 className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Reject
//               </button>
//               <button 
//                 onClick={() => handleDelete(review._id)} 
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             className={`px-4 py-2 mx-1 rounded ${
//               currentPage === index + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminReviewManagement;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reviews/all");
        setReviews(response.data.reviews);
        setFilteredReviews(response.data.reviews);
        setTotalPages(Math.ceil(response.data.reviews.length / reviewsPerPage));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchAllReviews();
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      await axios.patch(`http://localhost:3000/reviews/${reviewId}/approve`);
      const updatedReviews = reviews.map(review => 
        review._id === reviewId ? { ...review, approved: true } : review
      );
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews.filter(review => 
        review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) || 
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await axios.patch(`http://localhost:3000/reviews/${reviewId}/reject`);
      const updatedReviews = reviews.map(review => 
        review._id === reviewId ? { ...review, approved: false } : review
      );
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews.filter(review => 
        review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) || 
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } catch (error) {
      console.error("Error rejecting review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`);
      const updatedReviews = reviews.filter(review => review._id !== reviewId);
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews.filter(review => 
        review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) || 
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setTotalPages(Math.ceil(updatedReviews.length / reviewsPerPage));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = reviews.filter(review => 
      review.reviewer.toLowerCase().includes(e.target.value.toLowerCase()) || 
      review.review.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredReviews(filtered);
    setTotalPages(Math.ceil(filtered.length / reviewsPerPage));
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="admin-review-management p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Review Management</h2>
      <input
        type="text"
        placeholder="Search reviews"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="reviews-list space-y-4">
        {paginatedReviews.map((review) => (
          <div key={review._id} className="review-item p-4 bg-white shadow rounded-lg">
            <p className="mb-2"><strong>Reviewer:</strong> {review.reviewer}</p>
            <p className="mb-2"><strong>Review:</strong> {review.review}</p>
            <p className="mb-2"><strong>Product:</strong> {review.productName}</p>
            <p className="mb-2"><strong>Status:</strong> {review.approved ? "Approved" : "Pending"}</p>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => handleApprove(review._id)} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button 
                onClick={() => handleReject(review._id)} 
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Reject
              </button>
              <button 
                onClick={() => handleDelete(review._id)} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminReviewManagement;
