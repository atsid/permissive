'use strict';

var teamRepository = require('../components/repositories/teams'),
    userRepository = require('../components/repositories/users'),
    debug = require('debug')('app:middleware:identity'),
    Link = require('../links/Link');

module.exports = {
    listTeams (req, res, next) {
        debug('get teams [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        teamRepository.getTeams().then(teams => {
            req.entity = teams;
            next();
        }).catch(err => next(err));
    }
};
