'use strict';

let conf = require('./config'),
    github = require('./components/services/github.mock'),
    mockUser = github.users[conf.get('github.username')];

//our users always have a username, which is mapped from github's 'login' field
mockUser.username = mockUser.login;

//jscs:disable disallowDanglingUnderscores
module.exports = {

    initialize () {

        return (req, res, next) => {

            let passport = {};

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

    }

};
