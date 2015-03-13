'use strict';

require('babel/polyfill');

exports.start = () => {

    var express = require('express'),
        mountie = require('express-mountie'),
        http = require('http'),
        path = require('path'),
        app = express();

    app.set('port', 3000);

    app.use(express.static(path.resolve(__dirname, '../../app/client/build')));

    mountie({
        parent: app,
        src: path.join(__dirname, 'apps'),
        prefix: "/api/v1"
    });
    http.createServer(app).listen(app.get('port'), () => {
        console.log('-----------------------------------------------------------------------');
        console.log('Express server listening on port ' + app.get('port'));
    });
};
