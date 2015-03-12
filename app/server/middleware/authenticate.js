'use strict';

module.exports = {
    isAuthenticated (req, res, next) {
        var authenticated = req.isAuthenticated();
        console.log("authenticated? " + authenticated);

        if (authenticated) {
            console.log("next....");
            next();
        } else {
            res.send(401);
        }
    }
};
