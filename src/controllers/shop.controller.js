const formidable = require('formidable');
const Shop = require('../models/shop.model');
const { uploadSingleFile } = require('../middlewares/upload.middleware');
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
    let shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

module.exports.listByOwner = async (req, res, next) => {
  try {
    let shops = await Shop.find({ owner: req.params.userId });
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

module.exports.read = async (req, res) => res.json(req.shop);

module.exports.update = async (req, res) => {};
