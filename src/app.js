const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/user.routes');
const shopRouter = require('./routes/shop.routes');
const uploadRouter = require('./routes/upload.routes');
const productsRouter = require('./routes/product.routes');
const { connectDb } = require('./helpers/db.helper');
const config = require('./config');

connectDb(config.mongoUri);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/shops', shopRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/products', productsRouter);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

module.exports = app;
