'use strict';

var teamRepository = require('../components/repositories/teams'),
    debug = require('debug')('app:middleware:permissions');

/**
 * Middleware to adjust user permission levels on a repo.
 */
module.exports = {

    createTeamForRepoPermission (req, res, next) {

        debug('checking for team existence and creating if necessary');
        debug('params:' + JSON.stringify(req.params, null, 2));

        let params = req.params,
            repoId = params.id,
            permission = params.permission;

        teamRepository.check(repoId, permission).then((exists) => {
            debug('team exists for repo management?: ' + exists);

            if (!exists) {
                teamRepository.create(repoId, permission).then(() => {
                    next();
                }).catch(err => next(err));
            } else {
                next();
            }

        });

    },

    editRepoPermissionForUser (req, res, next) {
        debug('editing user repo permission level [' + req.path + ']');
        debug('params:' + JSON.stringify(req.params, null, 2));

        let params = req.params,
            username = params.username,
            repoId = params.id,
            permission = params.permission;

        teamRepository.edit(username, repoId, permission).then(() => {
            next();
        }).catch(err => next(err));

    }

};
