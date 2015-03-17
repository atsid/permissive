'use strict';

var teamRepository = require('../components/repositories/teams'),
    debug = require('debug')('app:middleware:permissions');

/**
 * Middleware to adjust user permission levels on a repo.
 */
module.exports = {

    editRepoPermissionForUser (req, res, next) {
        debug('editing user repo permission level [' + req.path + ']');
        debug('params:' + JSON.stringify(req.params, null, 2));

        // get params
        let params = req.params,
            username = params.username,
            repoId = params.id,
            permission = params.permission;

        teamRepository.check(repoId, permission).then((exists) => {
            console.log('team exists for repo management: ' + exists);

            if (exists) {

                teamRepository.edit(username, repoId, permission).then(resp => {
                    next();
                }).catch(err => next(err));

            } else {

                teamRepository.create(repoId, permission).then(team => {

                    teamRepository.edit(username, repoId, permission).then(resp => {
                        next();
                    }).catch(err => next(err));

                });
            }
        });


    }

};
