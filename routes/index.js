var express = require('express');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');

var user = require("./user.js");
var role = require("./role.js");
var login = require("./auth/login.js");
var reg = require("./auth/login.js");
var upload = require("./upload.js");
var dvd = require("./dvd.js");
var lOut = require("./logout.js");


var uploadDest = Multer({
  dest: './uploads'

});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * login routes 
 */
router.get('/login',login.userLogin);

// registration routes
router.post('/registeration', reg.registerUser);

// users routes
router.post('/api/v2/user', user.create);

router.get('/api/v2/user', user.getUsers);

// roles routes
router.get('/api/v2/role', role.get);
router.post('/api/v2/role', role.create);

// upload routes

router.post('/api/v2/uploads/timetable', uploadDest.single("file"), upload.parseUploadFile);


// dvd routes
router.post('/api/v2/dvd', dvd.create);
router.get('/api/v2/dvd', dvd.get);

router.get('/logout', lOut.logOut);


module.exports = router;
