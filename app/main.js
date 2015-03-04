'use strict';

exports.start = function () {

    var express = require('express'),
        http = require('http'),
        app = express(),
        userService = require('./server/services/github/users');

    app.set('port', 3000);

    app.use('/users/', function (req, res, next) {
        userService.get().then(function (users) {
            var text = '';
            users.forEach(function (user) {
                text += user.login + '<br/>';
            });
            res.send(text);
        }).catch(function (err) {
            next(err);
        });
    });

    app.use(express.static(__dirname + '/client/native'));

    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });

};
