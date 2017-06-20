
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var userModel = require('../../models/user.js');
var auth = require('basic-auth');
var jwt = require("jwt-simple");
var moment = require('moment');
moment().format();

var config = require("../../config/config");



// encode 


exports.userLogin = function (req, res) {

    var credentials = auth(req);
    if (credentials !== null || Object.keys(credentials).length === 0) {
        validate(credentials.name, credentials.pass).then(function (result) {

            if (credentials.name === result.username && credentials.pass === result.password) {
                generateToken();
                res.status(200);
                resultVal = {
                    "status": 200,
                    "statusText": "Validat credentials",
                };

                return res.json(resultVal);
            } else
                return res.json("login Unsuccessfully");

        });

    } else
        throw new Error('username and pass not found ' + credentials);

};

exports.registerUser = function (req, res) {

    console.log(req.body);

};

generateToken = function (user, roleCode) {
    var d = new Date();
    var expires = d.expireOn("7","moment");
    var payload = { username: user, role: roleCode };
    var token = jwt.encode({ payload: payload, exp: expires }, config.secret);
    return token;
};

Date.prototype.expireOn = function (noOfDays, ch) {

    if (ch == 'moment') {
        var date = moment()
            .add(2, 'd') //replace 2 with number of days you want to add
            .toDate(); //convert it to a Javascript Date Object if you like
    }


    this.setDate(this.getDate() + parseInt(noOfDays));
    return this;
};

validate = function (username, pass) {

    var deferred = q.defer();

     var query = userModel.findOne({ username: username, password: pass }).populate('roleId').exec(function(err, result) {
       if (err) throw new Error("User Not found");
        else {
            if (result.length !== null) {

                dbUserObj = { // spoofing a userobject from the DB. 
                    username: result._doc.username,
                    password: result._doc.password,
                    role:result._doc.roleId._doc.name
                };
                deferred.resolve(dbUserObj);
            } else {
                deferred.resolve(result);
            }
        }
});
   
    return deferred.promise;
};