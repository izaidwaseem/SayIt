const Product = require('../models/productSchema');
const cloudinary = require('.././config/cloudinaryConfig');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
// const upload = require('../config/multerConfig');
const multer = require('multer');


// Function to upload an image
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const uploadImagesInBulk = async (req, res) => {
  const folderPath = req.body.folderPath;

  try {
    // Recursively traverse the directory structure
    const uploadImagesRecursive = async (folder) => {
      const files = fs.readdirSync(folder);
      for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.statSync(filePath).isDirectory()) {
          // If it's a directory, recursively upload images
          await uploadImagesRecursive(filePath);
        } else {
          // If it's a file, upload it to Cloudinary
          try {
            const result = await cloudinary.uploader.upload(filePath);
            console.log('Uploaded image:', result.secure_url);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    };

    // Start uploading images recursively
    await uploadImagesRecursive(folderPath);

    res.json({ message: 'Images uploaded successfully' });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

const uploadImages = async (req, res) => {
  try {
      // Assuming req.body.folderPath contains the path to the folder to upload
      const folderPath = req.body.folderPath;
      await uploadImagesInBulk(folderPath);
      res.json({ message: 'Bulk upload completed successfully' });
  } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'Failed to upload images' });
  }
};

// const insertProductsFromCSV = async (req, res) => {
//   try {
//     const products = [];
  
//     // Construct the absolute path to the uploaded CSV file
//     const csvFilePath = path.join(__dirname, '..', 'uploads', 'wearables.csv');
//     console.log("path of csv:", csvFilePath);

//     fs.createReadStream(csvFilePath) // Use the correct file path
//       .pipe(csv())
//       .on('data', (row) => {
//         // Parse reviews into an array of objects
//         const reviews = row.reviews.split(',').map(review => {
//           const [reviewer, reviewText] = review.split(':');
//           return { reviewer: reviewer.trim(), review: reviewText.trim() };
//         });

//         // Construct product object
//         const product = {
//           name: row.name,
//           description: row.description,
//           price: parseInt(row.price),
//           imagePath: row.imagePath,
//           rating: parseFloat(row.rating),
//           reviews: reviews,
//           brand: row.brand,
//           category: [{ gender: row.category_gender, type: row.category_type }],
//         };
//         products.push(product);
//       })
//       .on('end', async () => {
//         await Product.insertMany(products);
//         res.status(200).json({ message: 'Data successfully inserted into MongoDB.' });
//       });


//   } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).json({ error: 'Failed to insert data into MongoDB.' });
//   }
// };

const insertProductsFromCSV = async (req, res) => {
  try {
    const products = [];
  
    // Construct the absolute path to the uploaded CSV file
    const csvFilePath = path.join(__dirname, '..', 'uploads', 'wearables.csv');
    console.log("path of csv:", csvFilePath);

    fs.createReadStream(csvFilePath) // Use the correct file path
      .pipe(csv())
      .on('data', (row) => {
        // Parse reviews into an array of objects
        const reviews = row.reviews.split(',').map(review => {
          const [reviewer, reviewText] = review.split(':');
          if (!reviewText) {
            return null; // Skip this review if reviewText is undefined
          }
          return { reviewer: reviewer.trim(), review: reviewText.trim() };
        }).filter(review => review !== null); // Filter out null reviews

        // Construct product object
        const product = {
          name: row.name,
          description: row.description,
          price: parseInt(row.price),
          imagePath: row.imagePath,
          rating: parseFloat(row.rating),
          reviews: reviews,
          brand: row.brand,
          category: [{ gender: row.category_gender, type: row.category_type }],
        };
        products.push(product);
      })
      .on('end', async () => {
        await Product.insertMany(products);
        res.status(200).json({ message: 'Data successfully inserted into MongoDB.' });
      });


  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data into MongoDB.' });
  }
};


// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllProducts = async (req, res) => {
  try {
    let { page, perPage } = req.query;
    page = parseInt(page) || 1; // Convert to integer, default to page 1
    perPage = parseInt(perPage) || 10; // Convert to integer, default to 10 products per page

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    const products = await Product.find().skip(startIndex).limit(perPage);

    res.json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProduct = async (req, res) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: req.body.imagePath, 
      rating: req.body.rating,
      reviews: req.body.reviews,
      brand: req.body.brand,
      category: req.body.category
    });
  
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const searchProducts = async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
      console.log('Search Term:', searchTerm);
      const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search regex
      console.log('Regex:', regex);

      const matchingProducts = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } }
        ]
      });
      if (matchingProducts.length === 0) {
        return res.status(404).json({ message: 'Sorry, no matching products found' });
      }
      res.json(matchingProducts);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Failed to search products' });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };

  const getProductReviews = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const reviews = product.reviews;
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
const addReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { reviewer, review } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the new review to the product's reviews array
    product.reviews.push({ reviewer, review });

    // Save the updated product
    await product.save();

    // Return the updated product with the added review
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

module.exports = { insertProductsFromCSV, getAllProducts, createProduct, uploadImages, searchProducts, getProductById, getProductReviews, addReview };
  

