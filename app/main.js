'use strict';

exports.start = function () {

    var express = require('express'),
        http = require('http'),
        app = express(),
        discovery = require('./server/discovery');

    app.set('port', 3000);

    app.use(express.static(__dirname + '/client/native'));

    discovery.find(__dirname + '/server/apps').then(function (apps) {

        apps.forEach(function (subapp) {
            app.use(subapp);
        });

        http.createServer(app).listen(app.get('port'), function () {
            console.log('-----------------------------------------------------------------------');
            console.log('Express server listening on port ' + app.get('port'));
        });

    });

};
