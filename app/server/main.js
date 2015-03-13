'use strict';

require('babel/polyfill');

exports.start = () => {

    var express = require('express'),
        http = require('http'),
        path = require('path'),
        app = express(),
        discovery = require('./discovery');

    app.set('port', 3000);

    app.use(express.static(path.resolve(__dirname, '../../app/client/build')));

    discovery.find(path.join(__dirname, './apps'))
    .then((apps) => {
        apps.forEach((subapp) => {
            app.use('/api/v1', subapp);
        });
        http.createServer(app).listen(app.get('port'), () => {
            console.log('Express server listening on port ' + app.get('port'));
        });
    })
    .catch((err) => {
        console.error("Error starting permissive", err);
    });
};
