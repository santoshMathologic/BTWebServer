
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var userModel = require('../../models/user.js');
var auth = require('basic-auth');
var jwt = require("jwt-simple");
var moment = require('moment');
moment().format();
var config = require("../../config/config");

exports.userLogin = function (req, res,next) {

    

    var credentials = auth(req);
    if (credentials !== null || Object.keys(credentials).length === 0) {
        validate(credentials.name, credentials.pass).then(function (result) {

            if (credentials.name === result.username && credentials.pass === result.password) {
                var tokenObj = generateToken(result.username, result.role);
                //var decoded = jwt.decode(token, config.secret, false, 'HS512');
                res.cookie('x-access-token',tokenObj.token , { maxAge: tokenObj.expire,httpOnly:true} );
                res.cookie('x-key', tokenObj.username);
                res.status(200);
                resultVal = {
                    status: 200,
                    message: "Authentication Success !!!!!!",
                    success: true,
                    tokenKey:tokenObj
                };
                return res.json(resultVal);
            } else
            
            res.status(401); 
                res.json({ status: 401, success: false, message: 'Authentication failed. Unauthorized User!!!' });

        });

    } else
        throw new Error('username and pass not found ' + credentials);

};

exports.registerUser = function (req, res) {

    console.log(req.body);

};

generateToken = function (username, roleCode) {
    var d = new Date();
    var expires = d.expireOn(7, "other");
    var payload = { username: username, role: roleCode };
    var token = jwt.encode({ payload: payload, expires: expires }, config.secret, 'HS512');

     return {
         "username": username,
         "role":roleCode,
         "expire" :expires,
         "token" : token
     };
    
};

Date.prototype.expireOn = function (noOfDays, ch) {
    switch (ch) {
        case "MOMENT":
        case "moment":
            var d = moment().add(noOfDays, 'd').toDate();
            break;

        case "OTHERS":
        case "other":
            this.setDate(this.getDate() + parseInt(noOfDays));
            break;
    }
    return this;

};

validate = function (username, pass) {

    var deferred = q.defer();

    var query = userModel.findOne({ username: username, password: pass }).populate('roleId').exec(function (err, result) {
        if (err) throw new Error("User Not found");
        else {

            console.log("DASDAS");
            if (result !== null) {
                dbUserObj = { // spoofing a userobject from the DB. 
                    username: result._doc.username,
                    password: result._doc.password,
                    role: result._doc.roleId._doc.name
                };
                deferred.resolve(dbUserObj);
            }
             deferred.resolve("User Not Found in the DB ");
        }
    });

    return deferred.promise;
};