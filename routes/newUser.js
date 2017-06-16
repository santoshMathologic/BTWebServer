var mongoose = require('mongoose');
var userModel = require('../models/user.js');
var q = require('q');
require('mongoose-query-paginate');
var newuserObj = {
    create: function (req, res) {

        var userobj = new userModel({
            username: req.body.username, 
            password: req.body.password
        });

        userModel.create(userobj, function (err, result) {
            if (err) return err;
            else {
                res.json(result);
                console.log(result);
            }
        });

    },
    getUsers: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            username: req.query.username
        };
        var query = userModel.find({});
        query.paginate(options, function (err, result) {
            if (err) return err;
            else {
                return res.json(result);

            }
        });

    }
};
module.exports = newuserObj;