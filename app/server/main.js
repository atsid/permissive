'use strict';

let conf = require('./config');

exports.start = () => {

    // HACKING IN CONFIG OBJECT HERE
    let config = {
        server: {
            port: conf.get('server.port'),
            api_prefix: '/api/v1',
            hostname: conf.get('server.hostname')
        },
        github: {
            clientID: conf.get('github.clientID'),
            clientSecret: conf.get('github.clientKey'),
            authRoute: '/auth/github',
            authCallbackRoute: '/auth/github/callback',
            failureCallback: '/auth/failure'
        },
        session: {
            secret: conf.get('session.secret'),
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false
            }
        }},
        express = require('express'),
        mountie = require('express-mountie'),
        http = require('http'),
        path = require('path'),
        session = require('express-session'),
        passport = require('./passport'),
        app = express();

    app.use(session(config.session));

    passport.setup(app, config);

    app.set('port', config.server.port);
    app.use(express.static(path.resolve(__dirname, '../../app/client/build')));

    mountie({
        parent: app,
        src: path.join(__dirname, 'apps'),
        prefix: config.server.api_prefix
    });
    http.createServer(app).listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    });
};
