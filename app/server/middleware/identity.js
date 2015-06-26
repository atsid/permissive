'use strict';

var userRepository = require('../components/repositories/users'),
    debug = require('debug')('app:middleware:identity'),
    Link = require('../links/Link');

module.exports = {
    getIdentity (req, res, next) {
        debug('get identity [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        let username = req.session.passport.user.username;
        userRepository.getUser(username).then(user => {
            req.entity = user;
            next();
        }).catch(err => next(err));
    }
};
