'use strict';

var permissionRepository = require('../components/repositories/permissions'),
    userRepository = require('../components/repositories/users'),
    session = require('../session');

module.exports = {

    listUsers (req, res, next) {
        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        userRepository.getUsers().then(users => {
            req.entity = users;
            next();
        }).catch(err => next(err));
    },

    listUsersPermission (req, res, next) {
        console.log('looking up repo permissions for users');

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
        console.log('checking for links on user list');

        let repoId = req.query.permission_repo,
            users = req.entity,
            username = session.user.username;

        if (repoId) {
            permissionRepository.getUserPermissionForRepo(username, repoId).then(permission => {
                if (permission.permissive === 'admin' || permission.github === 'admin') {
                    users.forEach(user => {
                        user.links = [{
                            rel: 'edit-repo-permission',
                            href: 'users/' + user.username + '/repos/' + repoId + '/permissions/{permission}',
                            method: 'PUT'
                        }];
                    });
                }
                next();
            }).catch(err => next(err));
        } else {
            next();
        }
    },

    readUser (req, res, next) {
        console.log('getting user [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        let username = req.params.username;
        userRepository.getUser(username).then(user => {
            req.entity = user;
            next();
        }).catch(err => next(err));
    }
};
