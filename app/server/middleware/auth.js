'use strict';

var username = process.env.GITHUB_USERNAME;

module.exports = {

    authenticate (req, res, next) {
        req.auth = { username: username };
        next();
    }

};
