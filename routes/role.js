
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var roleModel = require('../models/role.js');

var roleObj = {


   get:function(req,res){

       res.json({
          "message":"Hi from Role"
       });

   }




};
module.exports = roleObj;