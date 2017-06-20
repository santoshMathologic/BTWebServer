
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var trainDetailsRoutes = require("./trainDetails.js");
var Enum = require('enum');


var trainDetails = [];
var daysEnum = new Enum({'SUNDAY': 0, 'MONDAY':1, 'TUESDAY': 2, 'WEDNESDAY': 3, 'THURSDAY': 4, 'FRIDAY': 5,'SATURDAY':6});


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
                
                parseToTrainDetails(record);
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

parseToTrainDetails = function (records) {

 
    trainDetails = [];
        var trainNo = records.Train_No;
        var trainName = records.train_Name;
        var from = records.Source;
        var to = records.Destination;
        var trainType = records.Train_Type;
        var runDays = [];
        var rdays = {
            Friday: records.Friday,
            Monday: records.Monday,
            Saturday: records.Saturday,
            Sunday: records.Sunday,
            Thursday: records.Thursday,
            Tuesday: records.Tuesday,
            Wednesday: records.Wednesday
        };
        daysEnum.get('SUNDAY');
        runDays.push(rdays);
        pushDataToTrainDetails(trainNo, trainName, from, to,runDays, trainType);
        

    
 trainDetailsRoutes.saveBulkTrainDetails(trainDetails).then(function(result){
            console.log(result);
            
        });

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