const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  reviews: [{
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    reviewer: { type: String, required: true },
    review: { type: String, required: true }
  }], 
  brand: { type: String }, 
  category: [
    {
      gender: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }
  ],
});

module.exports = mongoose.model('Product', productSchema);
