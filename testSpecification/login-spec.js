

var logIn = require("../routes/login");
// var request = require('request');

require('../app');
var request = require('request');




describe("login function", function () {

    it("should be username and password correct", function () {
        var username = "test";var password = "test";
        var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        var url = "http://localhost:4000/login/";
        request.get({
            url: url,
            headers: {
                "Authorization": auth
            }
        }, function (error, response, body) {
            console.log('body : ', body);
            
        });



    });


});