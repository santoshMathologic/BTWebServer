
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var trainDetailsRoutes = require("./routes/trainDetails.js");


var parsedata = [];
var trainDetails = [];
var runDays = [];

var uploadObj = {

    parseFile: function (req, res, next) {
        var filePath = req.file.path;

        var columns = true;
        var source = fs.createReadStream(filePath);



        var parser = Parse({
            delimiter: ',',
            columns: columns
        });

        parser.on("readable", function () {
            var record;
            while (record = parser.read()) {
                parsedata.push(record);
                parseToTrainDetails(parsedata);
            }
        });

        parser.on("error", function (error) {
            console.log(error);
        });

        parser.on("end", function () {
            fs.unlinkSync(filePath);
            console.log("End");
        });

        source.pipe(parser);

    }
};

parseToTrainDetails = function (data) {


    for (var row = 1; row < data.length; row++) {
        var trainNo = data[row].Train_No;
        var trainName = data[row].train_Name;
        var from = data[row].Source;
        var to = data[row].Destination;
        var trainType = data[row].Train_Type;

        var rdays = {
            Friday: data[row].Friday,
            Monday: data[row].Monday,
            Saturday: data[row].Saturday,
            Sunday: data[row].Sunday,
            Thursday: data[row].Thursday,
            Tuesday: data[row].Tuesday,
            Wednesday: data[row].Wednesday
        };
        runDays.push(rdays);
        pushDataToTrainDetails(trainNo, trainName, from, to,runDays, trainType);
        trainDetailsRoutes.saveBulkTrainDetails(trainDetails).then(function(result){
            console.log(result);
        });

    }


};

pushDataToTrainDetails = function (trainNo, trainName, from, to, runningDays, trainType) {
    trainDetails.push({
        trainNo: trainNo,
        trainName: trainName,
        fromStation: from,
        toStation: to,
        runningDays: runningDays,
        trainType: trainType
    });
};


module.exports = uploadObj;