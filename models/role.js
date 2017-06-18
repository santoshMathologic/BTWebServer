var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    name: String,
    markDelete:{type:Boolean,default:false},
    createdTime: {type:Date , default:Date.now},
});
var rolemodel = mongoose.model('role', roleSchema);
module.exports = rolemodel; 