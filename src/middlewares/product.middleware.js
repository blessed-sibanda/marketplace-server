const Product = require('../models/product.model');

const productById = async (req, res, next, id) => {
  try {
    let shop = await Product.findById(id);

    if (!shop)
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
