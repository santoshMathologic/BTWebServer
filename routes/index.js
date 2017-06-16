var express = require('express');
var router = express.Router();

var user = require("./newUser.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/v1/user', user.create);

router.get('/api/v1/user', user.getUsers);

module.exports = router;
