var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors            =  require("cors");
var index = require('./routes/index');
var config = require('./config/config'); // get our config file
var validation = require('./middlewares/validationMiddleware'); // get our config file


var db = require("./database/db");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('superSecret', config.secret); // secret variable

app.use('/', index);

//app.use(validation({ option1: '1', option2: '2' }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var raw_port = process.env.PORT;

var port = normalizePort(raw_port || '4000');
app.set('port', port);

var server=app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:'+port);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.use(cors({origin: 'http://localhost:3000'}));
app.options('*', cors());


app.all('/*', function (req, res, next) {
  //res.header("Access-Control-Allow-Origin", req.headers.origin); // restrict it to the required domain
  res.header("Access-Control-Allow-Origin", '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Cookie');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


module.exports = app;
