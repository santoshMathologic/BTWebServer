
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var roleModel = require('../models/role.js');

var roleObj = {


    get: function (req, res) {

        res.json({
            "message": "Hi from Role"
        });

    },
    create: function (req, res) {

        var roleboj = roleModel({
            name: req.query.name
        });

        roleModel.create(roleboj, function (err, result) {
            if (err) {
                console.log(err);
            }
            return res.json({
                "message": "Hi from Role",
                "result": result
            });

        });


    }




};
module.exports = roleObj;