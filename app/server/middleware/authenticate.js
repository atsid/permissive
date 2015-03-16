'use strict';

var users = require('../components/repositories/users');

module.exports = {
    isAuthenticated (req, res, next) {
        var authenticated = req.isAuthenticated();

        if (authenticated && users.isOrgMember(req.session.passport.user.username)) {
            next();
        } else {
            res.send(401);
        }
    }
};
