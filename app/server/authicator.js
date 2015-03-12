'use strict';
var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy;

module.exports = {
    setup: function(app, config) {
        passport.use(new GitHubStrategy({
                clientID: config.github.clientID,
                clientSecret: config.github.clientSecret,
                callbackURL: config.server.hostName + ":" + config.app.port + config.github.authCallbackRoute
            },
            function(accessToken, refreshToken, profile, done) {
                done(null, { displayName: profile.displayName, id: profile.id, token: accessToken } );
            }));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        app.use(passport.initialize());
        app.use(passport.session());

        app.get(config.github.authRoute, passport.authenticate('github'));
        app.get(config.github.authCallbackRoute, passport.authenticate('github', { failureRedirect: config.github.failureRedirect, session: true }),
            function(req, res) {
                // TODO: redirect to initial request location...
                res.redirect('/');
            }
        );
    }
}
