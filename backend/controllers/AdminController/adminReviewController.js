const Product = require('../../models/productSchema');

// Get all reviews with pagination
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Product.aggregate([
            { $unwind: "$reviews" },
            {
                $project: {
                    _id: "$reviews._id",
                    reviewer: "$reviews.reviewer",
                    review: "$reviews.review",
                    approved: "$reviews.approved",
                    productName: "$name"
                }
            }
        ]);

        res.json({ reviews });
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({ error: 'Failed to fetch all reviews' });
    }
};

// Get paginated reviews
const getPaginatedReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalReviews = await Product.aggregate([
            { $unwind: "$reviews" },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            }
        ]);

        const total = totalReviews.length > 0 ? totalReviews[0].total : 0;

        const reviews = await Product.aggregate([
            { $unwind: "$reviews" },
            {
                $project: {
                    _id: "$reviews._id",
                    reviewer: "$reviews.reviewer",
                    review: "$reviews.review",
                    approved: "$reviews.approved",
                    productName: "$name"
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        res.json({
            reviews,
            totalReviews: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Approve a review
const approveReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const product = await Product.findOneAndUpdate(
            { "reviews._id": reviewId },
            { "$set": { "reviews.$.approved": true } },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json({ message: 'Review approved' });
    } catch (error) {
        console.error('Error approving review:', error);
        res.status(500).json({ error: 'Failed to approve review' });
    }
};

// Reject a review
const rejectReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const product = await Product.findOneAndUpdate(
            { "reviews._id": reviewId },
            { "$set": { "reviews.$.approved": false } },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json({ message: 'Review rejected' });
    } catch (error) {
        console.error('Error rejecting review:', error);
        res.status(500).json({ error: 'Failed to reject review' });
    }
};


// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const product = await Product.findOneAndUpdate(
            { "reviews._id": reviewId },
            { "$pull": { "reviews": { "_id": reviewId } } },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
};

module.exports = { getAllReviews, getPaginatedReviews, approveReview, rejectReview, deleteReview };
