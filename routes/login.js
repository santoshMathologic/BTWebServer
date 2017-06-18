
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var roleModel = require('../models/role.js');
var auth = require('basic-auth');

exports.userLogin = function (req, res) {

    var credentials = auth(req);
    if (credentials !== null || credentials.name) {
        if (credentials.name === 'test' && credentials.pass === 'test') {
            return res.json("login successfully");
        } else
            return res.json("login Unsuccessfully");
    }else
         throw new Error('username and pass not found ' + credentials);
    
};

exports.registration = function(req,res){

console.log(req.body);

};