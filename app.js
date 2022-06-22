const express = require('express');
const expressWinston = require('express-winston');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const configurePassportStrategy = require('./config/passport-config');

const createApp = (logger, authService, photoService, categoryService) => {
  const app = express();

  app.use(expressWinston.logger({ winstonInstance: logger }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  configurePassportStrategy(passport, authService);

  const buildPath = path.normalize(path.join(__dirname, './client/build'));
  app.use(express.static(buildPath));

  const authRouter = require('./routes/authRouter')(authService);
  const photosRouter = require('./routes/photosRouter')(photoService);
  const categoriesRouter = require('./routes/categoriesRouter')(categoryService);

  // api routes
  app.use('/api/auth', authRouter);
  app.use('/api/photos', photosRouter);
  app.use('/api/categories', categoriesRouter);

  // serve client if it's not an api route
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send('Not found');
  });

  // error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
  });

  return app;
};

module.exports = createApp;
