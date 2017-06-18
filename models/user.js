var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var userSchema = mongoose.Schema({
            username: String,
            password: String,
            markDelete:{type:Boolean,default:false},
            createdTime: {type:Date , default:Date.now},
            roleId: { type: Schema.Types.ObjectId, ref: 'role' },
         
 });
userSchema.plugin(deepPopulate);
module.exports = mongoose.model('user', userSchema);