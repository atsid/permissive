'use strict';

var users = require('../components/repositories/users')

module.exports = {
    isAuthenticated (req, res, next) {
        var authenticated = req.isAuthenticated();
        console.log("authenticated? " + authenticated);

        if (authenticated && users.isMember(req.session.passport.user.username)) {
            console.log("next....");
            next();
        } else {
            res.send(401);
        }
    }
};
