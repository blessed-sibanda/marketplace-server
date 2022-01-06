const mongoose = require('mongoose');
const config = require('../config');

const shopSchema = new mongoose.Schema(
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

shopSchema.virtual('imageUrl').get(function () {
  if (this.image) {
    return config.filesUrl + this.image;
  } else return '';
});

shopSchema.set('toObject', { virtuals: true });
shopSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Shop', shopSchema);
