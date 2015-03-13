'use strict';

var userRepository = require('../components/repositories/users'),
    debug = require('debug')('app:middleware:users');

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
            userRepository.getPermissions(repoId, users).then(users => {
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
            permissions; //TODO: get permissions got logged in uer

        if (repoId && permissions) {
            let permission = permissions[repoId],
                admin = permission.permissive === 'admin' || permission.github === 'admin';

            if (admin) {
                users.forEach(user => {
                    user.links = [{
                        rel: 'edit-repo-permission',
                        href: 'users/' + user.username + '/repos/' + repoId + '/permissions/{permission}',
                        method: 'PUT'
                    }];
                });
            }
        }
        next();
    },

    readUser (req, res, next) {
        debug('getting user [' + req.path + ']');
        debug('params:' + JSON.stringify(req.params, null, 2));

        let username = req.params.username;
        userRepository.getUser(username).then(user => {
            req.entity = user;
            next();
        }).catch(err => next(err));
    }
};
