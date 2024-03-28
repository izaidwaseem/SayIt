const Product = require('../models/productSchema');
const cloudinary = require('.././config/cloudinaryConfig');
const fs = require('fs');
const path = require('path');
const upload = require('../config/multerConfig');
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
// Function to upload images in bulk
// const uploadImagesInBulk = async (folderPath) => {
//   try {
//       const files = fs.readdirSync(folderPath);

//       for (const file of files) {
//           const filePath = path.join(folderPath, file);
//           const result = await cloudinary.uploader.upload(filePath);
//           console.log(`Uploaded ${file}: ${result.secure_url}`);
//       }
//   } catch (error) {
//       console.error('Error uploading images:', error);
//       throw error;
//   }
// };


// const uploadImages = async (req, res) => {
//   try {
//     upload.single('image')(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         res.status(400).json({ error: 'Failed to upload image' });
//       } else if (err) {
//         // An unknown error occurred when uploading.
//         res.status(500).json({ error: 'Failed to upload image' });
//       }

//       // No errors occurred. Proceed to upload image to Cloudinary.
//       try {
//         const imageUrl = await uploadImage(req.file); // Assuming you're uploading a file using Multer or similar middleware
//         res.json({ imageUrl });
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// };

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

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
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
  
  module.exports = { getAllProducts, createProduct, uploadImages, searchProducts, getProductById };
  

