
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var userModel = require('../../models/user.js');
var auth = require('basic-auth');

exports.userLogin = function (req, res) {

    var credentials = auth(req);
    if (credentials !== null || Object.keys(credentials).length === 0) {
        validate(credentials.name, credentials.pass).then(function (result) {

            if (credentials.name === result.name && credentials.pass === result.pass) {

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

validate = function (username, pass) {

    var deferred = q.defer();
    userModel.findOne({ username: username, password: pass }, function (err, result) {

        if (err) throw new Error("User Not found");
        else {
            if (result.length !== null) {

                dbUserObj = { // spoofing a userobject from the DB. 
                    name: result._doc.username,
                    pass: result._doc.password
                };
                deferred.resolve(dbUserObj);
            } else {
                deferred.resolve(result);
            }
        }


    });
    return deferred.promise;
};