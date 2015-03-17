'use strict';

var permissionRepository = require('../components/repositories/permissions'),
    repoRepository = require('../components/repositories/repos'),
    debug = require('debug')('app:middleware:repos');

module.exports = {

    listRepos (req, res, next) {
        debug('listing repos [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        let username = req.session.passport.user.username;

        repoRepository.getRepos().then(repos => {
            return permissionRepository.filterReposByUserPermission(repos, username).then(filteredRepos => {
                req.entity = filteredRepos;
                next();
            });
        }).catch(err => next(err));
    },

    listReposPermission (req, res, next) {
        debug('looking up user permission for repos');

        let username = req.query.permission_user,
            repos = req.entity;

        if (username) {
            permissionRepository.setUserPermissionForRepos(repos, username).then(repos => {
                req.entity = repos;
                next();
            }).catch(err => next(err));
        } else {
            next();
        }
    },

    listReposLinks (req, res, next) {

        let repos = req.entity,
            user = req.query.permission_user,
            username = req.session.passport.user.username;

        debug('checking for links on repo list for logged in [' + username + '] to edit [' + user + ']');

        if (user) {
            permissionRepository.getRepoPermissionsForUser(repos, username).then(permissions => {
                repos.forEach(repo => {
                    let permission = permissions[repo.id];
                    debug('got permission for [' + username + '] against repo [' + repo.id + ']', permission);
                    if (permission.permissive === 'admin' || permission.github === 'admin') {
                        repo.links = [{
                            rel: 'edit-user-permission',
                            href: 'repos/' + repo.id + '/users/' + user + '/permissions/{permission}',
                            method: 'PUT'
                        }];
                    }
                });
                next();
            }).catch(err => next(err));
        } else {
            next();
        }
    }
};
