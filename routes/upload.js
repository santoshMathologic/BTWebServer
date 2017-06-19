
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');

var uploadObj = {

             parseFile : function(req, res,next){

                 console.log(req);
                 return res.json("jjjjj");

             }




};


module.exports = uploadObj;