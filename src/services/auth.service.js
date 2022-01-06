const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user.model');

const config = require('../config');

const requireAuth = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

const isProfileOwner = async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!authorized)
    return res.status(403).json({
      message: 'Only the profile owner is authorized to perform this action',
    });
  next();
};

const createJwt = (user) => {
  const payload = {
    email: user.email,
    id: user._id,
    seller: user.seller,
  };
  const accessToken = jwt.sign(payload, config.jwtSecret, {
    subject: user._id.toString(),
    expiresIn: '3d',
  });
  return accessToken;
};

const isSeller = async (req, res, next) => {
  try {
    let user = await User.findById(req.auth.id);
    const authorized = user && user.seller;
    if (!authorized)
      return res.status(403).json({
        message: 'User is not a seller',
      });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { createJwt, requireAuth, isProfileOwner, isSeller };
