var mongoose = require('mongoose');
var trainDetailsSchema = mongoose.Schema({
    trainNo: Number,
    trainName:String,
    fromStation : String,
    toStation: String,
    runningDays: [],
    trainType: String,
    markDelete:{type:Boolean,default:false},
    createdTime: {type:Date , default:Date.now}
});
var trainDetails = mongoose.model('traindetails', trainDetailsSchema);
module.exports = trainDetails; 