'use strict';

let conf = require('./config');

exports.start = () => {

    let express = require('express'),
        mountie = require('express-mountie'),
        http = require('http'),
        path = require('path'),
        session = require('express-session'),
        passport = require('./passport'),
        app = express();

    app.set('port', conf.get('server.port'));

    app.use(session(conf.get('session')));

    app.use(passport());

    mountie({
        parent: app,
        src: path.join(__dirname, 'apps'),
        prefix: conf.get('api.prefix')
    });

    app.use(express.static(path.resolve(__dirname, '../../app/client/build')));

    http.createServer(app).listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    });
};
