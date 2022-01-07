const Product = require('../models/product.model');

const productById = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id).populate(
      'shop',
      '_id name image imageUrl',
    );

    if (!product)
      return res.status(404).json({
        error: 'Product not found',
      });
    req.product = product;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { productById };
