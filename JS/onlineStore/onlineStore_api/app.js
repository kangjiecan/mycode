var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products');
var purchaseRouter = require('./src/routes/purchase');

var app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

// Configure session
app.use(session({
  secret: 'assignment online store',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false, 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 
  }
}));;

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/purchase', purchaseRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;