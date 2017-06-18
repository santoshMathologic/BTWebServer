

var logIn = require("../routes/login");
var request = require('request');

var username = "test";
var password = "test";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var url = "http://localhost:4000/login/";


describe("login function", function () {

    it("should be username and password correct", function () {
        //var result = logIn.userLogin()
        //expect(result).toBe(6);

        request.post({
            url: url,
            headers: {
                "Authorization": auth
            }
        }, function (error, response, body) {
            console.log('body : ', body);
            console.log('body : ', error);
            console.log('body : ', response);
        });



    });


});