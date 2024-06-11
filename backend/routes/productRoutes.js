const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, uploadImages, searchProducts, getProductById, getProductReviews, addReview, insertProductsFromCSV, filterProducts, updateProduct, getProductsCountByBrand, deleteReview } = require('../controllers/productController');

// Define your routes
router.get('/getAllProducts', getAllProducts);
router.post('/createProduct', createProduct);
router.post('/uploadImages', uploadImages);
router.get('/searchProducts', searchProducts);
router.get('/getProductById/:productId', getProductById);
router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/addReview', addReview);
router.post('/insertProductsFromCSV', insertProductsFromCSV);
router.get('/filterProducts', filterProducts);
router.put('/products/:id', updateProduct); // Ensure this endpoint matches the URL structure used in your frontend
router.get('/products/brand-count', getProductsCountByBrand); // New route
router.delete('/reviews/:reviewId', deleteReview);

module.exports = router;
