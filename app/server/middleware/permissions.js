'use strict';

var permissionRepository = require('../components/repositories/permissions'),
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
    },

    editRepoPermissionForUser (req, res, next) {
        debug('editing user repo permission level [' + req.path + ']');
        debug('params:' + JSON.stringify(req.params, null, 2));

        let params = req.params,
            username = params.username,
            repoId = params.id,
            permission = params.permission;
        permissionRepository.editUserPermissionForRepo(username, repoId, permission).then(() => {
            next();
        }).catch(err => next(err));
    }
};
