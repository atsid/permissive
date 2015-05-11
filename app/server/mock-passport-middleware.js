'use strict';

var conf = require('./config');
//jscs:disable disallowDanglingUnderscores
module.exports = {
    initialize(mockUser) {
        return function (req, res, next) {
            var passport = {};
            passport._key = 'passport';
            passport._userProperty = 'user';
            passport.serializeUser = (user, req, done) => {
                done(null, user);
            };
            passport.deserializeUser = (user, req, done) => {
                done(null, user);
            };

            req._passport = { instance: passport };
            req._passport.session = { user: mockUser };
            req.session.passport = { user: mockUser };

            next();
        };
    },

    // TODO ... PUT Mock users in a seperate file so we can tests users that are
    mockUser: { username: conf.get('github.username'), displayName: 'Test User', id: 1 }
};
