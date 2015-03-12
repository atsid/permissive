'use strict';

module.exports = {
    isAuthenticated (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }

        console.log("Not authenticated, sending 401");
        res.send(401);
    }
};
