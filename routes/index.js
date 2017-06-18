var express = require('express');
var router = express.Router();

var user = require("./user.js");
var role = require("./role.js");
var login = require("./auth/login.js");
var reg = require("./auth/login.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * login routes 
 */
router.get('/login', login.userLogin);
router.post('/registeration', reg.registerUser);

router.post('/api/v1/user', user.create);

router.get('/api/v1/user', user.getUsers);

router.get('/api/v1/role', role.get);
router.post('/api/v1/role', role.create);

module.exports = router;
