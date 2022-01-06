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

const isShopOwner = async (req, res, next) => {
  const isOwner = req.shop && req.auth && req.auth.id === req.shop._id.toString();
  if (!isOwner) return res.status(403).json({ message: 'User is not authorized' });
  next();
};

module.exports = { shopById, isShopOwner };
