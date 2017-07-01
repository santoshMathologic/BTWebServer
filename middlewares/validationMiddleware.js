
' use strict';

var userModel = require('../models/user.js');


module.exports = function (req, res, next) {

  var usertoken = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || (req.cookies && req.cookies['x-access-token']);
  var userkey = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'] || (req.cookies && req.cookies['x-key']);

var nlength = req.url.indexOf('/api/v1/');
   if (nlength >= 0) {
      console.log("inside Admin ");
   }
  if (typeof userkey !== "undefined" && typeof usertoken !== 'undefined') {
    var userObj = {username: userkey};
     var query = userModel.findOne(userObj,function (err, result) {
        if (err) throw new Error("User Not found");
        else {
              next();         
        }
    });
    
    
    
  } else {
    res.status(401);
    res.json(
      { "message": "Unauthorized Users", "status": "401" });
  }





};