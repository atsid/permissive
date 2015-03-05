'use strict';

exports.start = () => {

    var express = require('express'),
        http = require('http'),
        app = express(),
        discovery = require('./server/discovery');

    app.set('port', 3000);

    app.use(express.static(__dirname + '/client/native'));

    discovery.find(__dirname + '/server/apps').then((apps) => {

        apps.forEach((subapp) => {
            app.use(subapp);
        });

        http.createServer(app).listen(app.get('port'), () => {
            console.log('-----------------------------------------------------------------------');
            console.log('Express server listening on port ' + app.get('port'));
        });
    });
};
