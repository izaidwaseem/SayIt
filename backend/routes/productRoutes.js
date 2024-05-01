const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, uploadImages, searchProducts, getProductById, getProductReviews, addReview, insertProductsFromCSV } = require('../controllers/productController');

// Define your routes
router.get('/getAllProducts', getAllProducts);
router.post('/createProduct', createProduct);
router.post('/uploadImages', uploadImages);
router.get('/searchProducts', searchProducts);
router.get('/getProductById/:productId', getProductById);
router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/addReview', addReview);
router.post('/insertProductsFromCSV', insertProductsFromCSV);


module.exports = router;
