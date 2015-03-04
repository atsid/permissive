'use strict';

exports.start = function () {

    var express = require('express'),
        http = require('http'),
        app = express(),
        users = require('./server/routes/users'),
        repos = require('./server/routes/repos');

    app.set('port', 3000);

    app.use(users);
    app.use(repos);

    app.use(express.static(__dirname + '/client/native'));

    http.createServer(app).listen(app.get('port'), function () {
        console.log('-----------------------------------------------------------------------');
        console.log('Express server listening on port ' + app.get('port'));
    });

};
