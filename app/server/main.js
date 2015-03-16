'use strict';

exports.start = () => {

    // HACKING IN CONFIG OBJECT HERE
    var config = {
        server: {
            port: '3000',
            api_prefix: '/api/v1',
            hostname: 'localhost'
        },
        github: {
            clientID: process.env.GITHUB_CLIENTID,
            clientSecret: process.env.GITHUB_CLIENT_KEY,
            authRoute: '/auth/github',
            authCallbackRoute: '/auth/github/callback',
            failureCallback: '/auth/failure'
        },
        session: {
            secret: 'keyboard cat',
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
        prefix: "/api/v1"
    });
    http.createServer(app).listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    });
};
