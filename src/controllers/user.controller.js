const merge = require('lodash/merge');
const User = require('../models/user.model');

module.exports.list = async (req, res) => {
  try {
    let users = await User.find().select('name email updatedAt createdAt');
    res.json(users);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.read = async (req, res) => {
  res.json(req.profile);
};

module.exports.update = async (req, res) => {
  try {
    delete req.body._id;
    delete req.body.hashedPassword;
    delete req.body.salt;

    if (req.body.email && req.body.email.trim() === req.profile.email)
      delete req.body.email;

    let user = merge(req.profile, req.body);
    user = await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.delete = async (req, res) => {
  try {
    await req.profile.remove();
    res.status(204).json();
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};
