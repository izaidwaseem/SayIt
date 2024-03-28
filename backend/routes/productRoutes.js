const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, uploadImages, searchProducts, getProductById } = require('../controllers/productController');

// Define your routes
router.get('/getAllProducts', getAllProducts);
router.post('/createProduct', createProduct);
router.post('/uploadImages', uploadImages);
router.get('/searchProducts', searchProducts);
router.get('/getProductById/:productId', getProductById);


module.exports = router;
