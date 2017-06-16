var m = require('mongoose');
var roleSchema = m.Schema({
    name: String,
});
module.exports = mongoose.model('Role', roleSchema);