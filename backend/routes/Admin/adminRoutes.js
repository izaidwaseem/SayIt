const express = require('express');
const router = express.Router();
const { getAllReviews, getPaginatedReviews, approveReview, rejectReview, deleteReview } = require('../../controllers/AdminController/adminReviewController');
const { registerAdmin } = require('../../controllers/AdminController/adminRegisterationController');

router.get('/reviews/all', getAllReviews);
router.get('/reviews', getPaginatedReviews);
router.patch('/reviews/:reviewId/approve', approveReview);
router.patch('/reviews/:reviewId/reject', rejectReview);
router.delete('/reviews/:reviewId', deleteReview);
router.post('/admin/register', registerAdmin);


module.exports = router;
