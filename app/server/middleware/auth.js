'use strict';

var user = { username: process.env.GITHUB_USERNAME };

module.exports = {

    authenticate (req, res, next) {
        req.auth.username = user.username;
    }

};
