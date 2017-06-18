var express = require('express');
var router = express.Router();

var user = require("./user.js");
var role = require("./role.js");
var login = require("./login.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * login routes 
 */
router.post('/login', login.userLogin);

router.post('/api/v1/user', user.create);

router.get('/api/v1/user', user.getUsers);

router.get('/api/v1/role', role.get);
router.post('/api/v1/role', role.create);

module.exports = router;
