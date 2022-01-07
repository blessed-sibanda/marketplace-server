const formidable = require('formidable');
const merge = require('lodash/merge');
const { formatError } = require('../helpers/error.helper');
const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { removeFile } = require('../helpers/upload.helper');
const Product = require('../models/product.model');

module.exports.create = async (req, res) => {
  let product = new Product();
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      product = new Product(fields);
      product.shop = req.shop._id;
    });

    await uploadSingleFile(req, res);

    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();

    return res.json(product);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.listByShop = async (req, res, next) => {
  try {
    let products = await Product.find({ shop: req.shop._id }).populate(
      'shop',
      '_id name',
    );

    res.json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.listLatest = async (req, res, next) => {
  try {
    let products = await Product.find({})
      .sort('-createdAt')
      .limit(5)
      .populate('shop', '_id name');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.relatedProducts = async (req, res, next) => {
  try {
    let products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(5)
      .populate('shop', '_id name');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.read = async (req, res, next) => res.json(req.product);
