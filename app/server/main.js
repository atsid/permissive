'use strict';

let conf = require('./config');

exports.start = () => {

    let express = require('express'),
        mountie = require('express-mountie'),
        session = require('express-session'),
        http = require('http'),
        path = require('path'),
        passport = require('./passport'),
        app = express();

    app.set('port', conf.get('server.port'));

    app.use(session(conf.get('session')));

    app.use(passport());

    mountie({
        parent: app,
        src: path.join(__dirname, 'apps'),
        prefix: '/' + conf.get('api.root') + conf.get('api.version')
    });

    app.use(express.static(path.resolve(__dirname, '../../app/client/build')));

    http.createServer(app).listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    });

};
