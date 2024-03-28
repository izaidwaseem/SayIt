// backend/models/productSchema.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  reviews: [{ type: String }], 
  brand: { type: String }, 
  category: { type: String } 
});

module.exports = mongoose.model('Product', productSchema);
