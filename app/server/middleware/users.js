'use strict';

var permissionRepository = require('../components/repositories/permissions'),
    userRepository = require('../components/repositories/users'),
    debug = require('debug')('app:middleware:users'),
    Link = require('../links/Link');

module.exports = {

    listUsers (req, res, next) {
        debug('listing users [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        userRepository.getUsers().then(users => {
            req.entity = users;
            next();
        }).catch(err => next(err));
    },

    listUsersPermission (req, res, next) {
        debug('looking up repo permissions for users');

        let repoId = req.query.permission_repo,
            users = req.entity;

        if (repoId) {
            permissionRepository.setRepoPermissionForUsers(users, repoId).then(users => {
                req.entity = users;
                next();
            }).catch(err => next(err));
        } else {
            next();
        }
    },

    listUsersLinks (req, res, next) {
        debug('checking for links on user list');

        let repoId = req.query.permission_repo,
            users = req.entity,
            username = req.session.passport.user.username;

        if (repoId) {
            permissionRepository.getUserPermissionForRepo(username, repoId).then(permission => {
                if (permission.permissive === 'admin' || permission.github === 'admin') {
                    users.forEach(user => {
                        let editLink = new Link({
                            rel: 'edit-repo-permission',
                            app: 'users',
                            method: 'editPermission',
                            params: {
                                id: repoId,
                                username: user.username
                            }
                        });
                        user.links = [editLink];
                    });
                }
                next();
            }).catch(err => next(err));
        } else {
            next();
        }
    }
};
