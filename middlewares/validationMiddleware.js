
' use strict';

var userModel = require('../models/user.js');
var jwt = require("jwt-simple");
var config = require("../config/config");

module.exports = function (req, res, next) {

  var usertoken = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || (req.cookies && req.cookies['x-access-token']);
  var userkey = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'] || (req.cookies && req.cookies['x-key']);


  if (req.url.indexOf('/api/v2/') >= 0) {
    if (typeof userkey !== "undefined" && typeof usertoken !== 'undefined') {

      if (decodeToken(usertoken)) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      var userObj = { username: userkey };
      var query = userModel.findOne(userObj, function (err, result) {
        if (err) throw new Error("User Not found");
        else {
          next();
        }
      });



    } else {
      res.status(401);
      res.json({ "message": "Unauthorized Users", "status": "401" });
    }

  }


  function decodeToken(tkn) {
    var decoded = jwt.decode(tkn, config.secret, false, 'HS512');
    //console.log(Date.now());
    var d1 = new Date();
    if (decoded.expires <= d1) {
      return true;
    } else {
      return false;
    }
  }



};