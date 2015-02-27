'use strict';

exports.start = function () {
    
    var express = require('express'),
        http = require('http'),
        app = express(),
        userService = require('./server/services/github/users');

    app.set('port', 3000);

    app.use('/users/', function (req, res, next) {
        var callback = function (resp, data) {
                var text = "";
                data.forEach(function (user) {
                    text += user.login + '<br/>';
                });
                res.send(text);
            },
            users = userService.get(callback);
    });

    app.use(express.static(__dirname + "/client/native"));

    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });

};
