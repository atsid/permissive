'use strict';

var permissionsRepository = require('../components/repositories/permissions'),
    debug = require('debug')('app:middleware:identity'),
    Link = require('../links/Link');

module.exports = {
    getOrganization (req, res, next) {
        debug('get organization [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        permissionRepository.getOrganization().then(org => {
            req.entity = org;
            next();
        }).catch(err => next(err));
    }
};
