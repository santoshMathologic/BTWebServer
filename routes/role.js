
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var roleModel = require('../models/role.js');

var roleObj = {
    get: function (req, res) {

        roleModel.find({}, function (error, result) {
            if (error) {
                throw new Error('Error in creating role ' + error);
            }
            else {
                return res.json({
                    "result": result
                });

            }

        });

    },
    create: function (req, res) {

        var roleObj = roleModel({
            name: req.body.name
        });

        roleModel.create(roleObj, function (error, result) {
            if (error) {
                throw new Error('Error in creating role ' + error);
            }
            res.status(201);
            return res.json({
                "message": "role has been created successfully",
                "status": "200",
                "success": true,
            });

        });


    }




};
module.exports = roleObj;