var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    name: String,
});
var rolemodel = mongoose.model('Role', roleSchema);
module.exports = rolemodel; 