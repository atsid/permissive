'use strict';

require('babel/polyfill');

exports.start = () => {

    // HACKING IN CONFIG OBJECT HERE
    var config = {
        server: {
            port: '3000',
            api_prefix: '/api/v1',
            hostname: process.env.HOSTNAME
        },
        github: {
            clientID: process.env.GITHUB_CLIENTID,
            clientSecret: process.env.GITHUB_CLIENT_KEY,
            authRoute: '/auth/github',
            authCallbackRoute: '/auth/github/callback',
            failureCallback: '/signup'
        },
        session: {
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false
            }
        }
    }

    var express = require('express'),
        http = require('http'),
        path = require('path'),
        session = require('express-session'),
        authenticator = require('./authenticator'),
        app = express(),
        discovery = require('./discovery');

    app.use(session(config.session));

    authenticator.setup(app, config);

    app.set('port', config.server.port);
    app.use(express.static(path.resolve(__dirname, '../../app/client/build')));

    discovery.find(path.join(__dirname, './apps'))
    .then((apps) => {
        apps.forEach((subapp) => {
            app.use(config.server.api_prefix, subapp);
        });
        http.createServer(app).listen(config.server.port, () => {
            console.log('-----------------------------------------------------------------------');
            console.log('Express server listening on port ' + config.server.port);
        });
    })
    .catch((err) => {
        console.error("Error starting permissive", err);
    });
};
