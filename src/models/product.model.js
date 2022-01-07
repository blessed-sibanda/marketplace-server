const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
    },
    description: {
      type: String,
      trim: true,
    },
    image: String,
    category: String,
    quantity: {
      type: Number,
      required: 'Quantity is required',
    },
    price: {
      type: Number,
      required: 'Price is required',
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
