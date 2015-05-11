'use strict';


var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    express = require('express'),
    debug = require('debug')('app:passport'),
    conf = require('./config'),
    app = express();

/**
 * Sets up passport-github for authentication by creating routes on the app for retrieving oauth tokens from
 * github.
 */
module.exports = () => {

    passport.use(new GitHubStrategy({
            clientID: conf.get('oauth.clientID'),
            clientSecret: conf.get('oauth.clientKey'),
            callbackURL: conf.get('server.protocol') + '://' +
                conf.get('server.hostname') + ':' +
                conf.get('server.port') +
                conf.get('oauth.authCallbackRoute')
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, { username: profile.username, displayName: profile.displayName, id: profile.id, token: accessToken });
        }));

    passport.serializeUser(function (user, done) {
        debug("serialize user");
        debug(user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        debug("deserialize user");
        debug(user);
        done(null, user);
    });

    if (conf.get('service') === 'mock') {
        // TODO ... is there a real di way to do this??
        debug('using the mock passport middlware');
        let mock = require('./mock-passport-middleware');
        app.use(mock.initialize(mock.mockUser));
    } else {
        debug('using the standard passport middleware');
        app.use(passport.initialize());
    }

    app.use(passport.session());

    app.get(conf.get('oauth.authenticatedRoute'),
        function (req, res) {
            var authenticated = req.isAuthenicated();
            if (authenticated) {
                res.send(200);
            } else {
                res.send(401);
            }
        });

    app.get(conf.get('oauth.authRoute'), passport.authenticate(conf.get('oauth.provider')));

    app.get(conf.get('oauth.authCallbackRoute'), passport.authenticate(conf.get('oauth.provider'),
            { failureRedirect: conf.get('oauth.failureRedirect'), session: true }),
        function (req, res) {
            var authenticated = req.isAuthenticated();
            debug("authenticated? " + authenticated);
            // TODO: redirect to initial request location...
            res.redirect('/');
        }
    );

    app.get(conf.get('oauth.failureCallback'), function (req, res, next) {
        res.send(401);
    });

    return app;

};
