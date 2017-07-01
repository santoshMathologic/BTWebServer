
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var dvd = require('../models/dvd.js');

var dvObj = {
    get: function (req, res) {

        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,

        };
        var query = dvd.find({});
        query.paginate(options, function (error, result) {
            if (error) {
                throw new Error('Error in creating role ' + error);
            }
            else {
                return res.json(result);
            }
        });
    },

    create: function (req, res) {

        var dSchema = new dvd({
            isbn: req.body.isbn,
            edition: req.body.edition,
            screen_format: req.body.screen_format
        });
        dvd.create(dSchema, function (error, result) {
            if (error) {
                throw new Error('Error in creating dvd ' + error);
            }
            res.status(201);

            return res.jsonp({
                "message": "dvd has been created successfully",
                "status": "200",
                "success": true,
            });

        });


    }
};
module.exports = dvObj;