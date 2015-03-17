'use strict';

let users = require('../components/repositories/users'),
    debug = require('debug')('app:middleware:authenticate');

module.exports = {
    isAuthenticated (req, res, next) {

        let authenticated = req.isAuthenticated();

        function f401() {
            res.send(401);
        }

        debug('session is authenticated: ' + authenticated);

        if (authenticated) {

            let username = req.session.passport.user.username;

            debug('checking membership for ' + username);

            users.isOrgMember(username).then((isMember) => {
                debug('user [' + username + '] is org member: ' + isMember);
                if (isMember) {
                    next();
                } else {
                    f401();
                }
            }).catch(() => {
                f401();
            });
        } else {
            f401();
        }
    }
};
