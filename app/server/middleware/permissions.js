'use strict';

var teamRepository = require('../components/repositories/teams');

/**
 * Middleware to adjust user permission levels on a repo.
 */
module.exports = {

    editRepoPermissionForUser (req, res, next) {
        console.log('editing user repo permission level [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        // get params
        let params = req.params,
            username = params.username,
            repoId = params.id,
            permission = params.permission;

        teamRepository.edit(username, repoId, permission).then(resp => {
            next();
        }).catch(err => next(err));
    },

    removeRepoPermissionForUser (req, res, next) {
        console.log('removing user repo permission level [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));
        next();

        // get params
        let params = req.params,
            username = params.username,
            repoId = params.id,
            permission;

        teamRepository.remove(username, repoId, permission).then(resp => {
            next();
        }).catch(err => next(err));
    }
};
