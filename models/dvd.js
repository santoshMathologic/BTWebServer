
var mongoose = require('mongoose');
 
var dvdSchema = mongoose.Schema({
    isbn: String,
    edition: String,
    screen_format: String

});

module.exports = mongoose.model('dvd', dvdSchema);