'use strict';


var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    debug = require('debug')('app:passport');

module.exports = {
    /**
     * Sets up passport-github for authentication by creating routes on the app for retrieving oauth tokens from
     * github.
     *
     * @param app the app that will use the githug authentication
     * @param config configuration from the app using the authenticator
     */
    setup: function (app, config) {
        passport.use(new GitHubStrategy({
                clientID: config.github.clientID,
                clientSecret: config.github.clientSecret,
                callbackURL: "http://" + config.server.hostname + ":" + config.server.port + config.github.authCallbackRoute
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

        if (process.env.SERVICE === 'mock') {
            // TODO ... is there a real di way to do this??
            debug('using the mock passport middlware');
            var mock = require('./mock-passport-middleware');
            app.use(mock.initialize(mock.mockUser));
        } else {
            debug('using the standard passport middlware');
            app.use(passport.initialize());
        }
        app.use(passport.session());

        app.get('/auth/authenticated', function (req, res) {
            var authenticated = req.isAuthenicated();
            if (authenticated) {
                res.send(200);
            } else {
                res.send(401);
            }
        });
        app.get(config.github.authRoute, passport.authenticate('github'));
        app.get(config.github.authCallbackRoute, passport.authenticate('github',
            { failureRedirect: config.github.failureRedirect, session: true }),
            function (req, res) {
                var authenticated = req.isAuthenticated();
                debug("authenticated? " + authenticated);
                // TODO: redirect to initial request location...
                res.redirect('/');
            }
        );
        app.get(config.github.failureCallback, function (req, res, next) {
            res.send(401);
        });
    }
};
