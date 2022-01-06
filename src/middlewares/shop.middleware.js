const Shop = require('../models/shop.model');

const shopById = async (req, res, next, id) => {
  try {
    let shop = await Shop.findById(id).populate('owner', '_id name');

    if (!shop)
      return res.status(404).json({
        error: 'Shop not found',
      });
    req.shop = shop;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { shopById };
