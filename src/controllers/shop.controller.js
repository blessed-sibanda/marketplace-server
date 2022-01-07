const formidable = require('formidable');
const merge = require('lodash/merge');

const Shop = require('../models/shop.model');
const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { removeFile } = require('../helpers/upload.helper');
const { formatError } = require('../helpers/error.helper');

module.exports.create = async (req, res) => {
  try {
    let shop;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      shop = new Shop(fields);
      shop.owner = req.auth.id;
    });

    await uploadSingleFile(req, res);

    if (req.file) {
      shop.image = req.file.filename;
    }

    await shop.save();

    return res.json(shop);
  } catch (err) {
    return res.status(400).json(formatError(err));
  }
};

module.exports.list = async (req, res, next) => {
  try {
    let shops = await Shop.find().populate('owner', '_id name');
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

module.exports.listByOwner = async (req, res, next) => {
  try {
    let shops = await Shop.find({ owner: req.params.userId }).populate(
      'owner',
      '_id name',
    );
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

module.exports.read = async (req, res) => res.json(req.shop);

const cleanedShopData = (shop, data) => {
  delete data._id;
  delete data.image;
  delete data.owner;

  return merge(shop, data);
};

module.exports.update = async (req, res) => {
  let shop = req.shop;

  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      shop = cleanedShopData(shop, fields);
    });

    await uploadSingleFile(req, res);
    console.log('req.file', req.file);
    if (req.file) {
      await removeFile(shop.image);
      shop.image = req.file.filename;
    } else {
      user = cleanedShopData(shop, req.body);
    }

    await shop.save();

    let updatedShop = await Shop.findById(shop._id).populate('owner', '_id name');
    return res.json(updatedShop);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    await removeFile(req.shop.image);
    await req.shop.remove();
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
