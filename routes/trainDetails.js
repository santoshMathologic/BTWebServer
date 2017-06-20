var mongoose = require('mongoose');
var trainDetailsModel = require('../models/trainDetails.js');
var q = require('q');

require('mongoose-query-paginate');



var trainDetailsObj = {
    /**
     * Insert Trains Into DB
     */
    saveBulkTrainDetails: function (data) {
        var deferred = q.defer();
        trainDetailsModel.insertMany(data, function (err, post) {
            if (err) 
                        console.log(err);
            
            deferred.resolve("saveSuccessfully");

        });
        return deferred.promise;
    },

    /**
     * Get All trains from database
     */
    getTrainList: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'trainNo'
        };


    },



    deleteTrainList: function (data) {
        var deferred = q.defer();
        trainDetailsModel.remove({ trainNo: { $in: data } }, function (err, docs) {
            if (err) console.log(err);
            deferred.resolve(docs);
        });

        return deferred.promise;
    },


    updateTrainList: function (data) {
        var deferred1 = q.defer();

        trainDetailsModel.findByIdAndUpdate(data.id, { 'trainName': data.trainName, 'fromStation': data.fromStation, 'toStation': data.toStation, 'runningDays': data.runningDays, 'trainType': data.trainType }).then(function (result) {
            deferred1.resolve(result);
        }, function (error) {
            console.log(error);
        })
        return deferred1.promise;
    },


    doesTrainExist: function (data) {
        var deferred = q.defer();


        trainDetailsModel.find({ 'trainNo': data.trainNo }).then(function (result) {

            deferred.resolve({ originalData: data, result: result });

        }, function (error) {
            console.log(error);
        });
        return deferred.promise;

    }

};

module.exports = trainDetailsObj;