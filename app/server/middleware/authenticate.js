'use strict';

module.exports = {
    isAuthenticated: function (req, res, next) {
        console.log("isAuthenticated");
        if (req.isAuthenticated()) {
            console.log("Authenticated");
            next();
        }

        console.log("redirecting to authentication");

        // todo : use config object to create this url...
        res.redirect('/api/v1/auth/github');
    }
};
