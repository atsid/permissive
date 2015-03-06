'use strict';

exports.start = () => {

    var express = require('express'),
        http = require('http'),
        path = require('path'),
        app = express(),
        discovery = require('./discovery');

    app.set('port', 3000);
    app.use(express.static(path.join(__dirname, '../client/native')));
    discovery.find(path.join(__dirname, './apps'))
    .then((apps) => {
        apps.forEach((subapp) => {
            app.use(subapp);
        });

        http.createServer(app).listen(app.get('port'), () => {
            console.log('-----------------------------------------------------------------------');
            console.log('Express server listening on port ' + app.get('port'));
        });
    });
};