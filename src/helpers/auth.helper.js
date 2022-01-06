const jwt = require('jsonwebtoken');
const config = require('../config');

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

module.exports = { createJwt };
