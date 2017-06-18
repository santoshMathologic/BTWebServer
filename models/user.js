var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
            username: String,
            password: String,
            markDelete:{type:Boolean,default:false},
            createdTime: {type:Date , default:Date.now},
            roleId: { type: Schema.Types.ObjectId, ref: 'plan' },
         
 });

module.exports = mongoose.model('User', userSchema);