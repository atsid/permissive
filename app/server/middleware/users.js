'use strict';

var userRepository = require('../components/repositories/users'),
    repoService = require('../components/repositories/repos'),
    Bluebird = require('bluebird');

module.exports = {

    listUsers (req, res, next) {
        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        userRepository.getUsers().then((users) => {
            req.entity = users;
            next();
        }).catch((err) => {
            next(err);
        });
    },

    listUsersPermission (req, res, next) {
        console.log('looking up repo permissions for users');

        let repoId = req.query.permission_repo,
            users = req.entity;

        if (repoId) {
            userRepository.getPermissions(repoId, users).then((users) => {
                req.entity = users;
                next();
            }).catch((err) => {
                next(err);
            });
        }
    },

    listUsersLinks (req, res, next) {
        console.log('checking for links on user list');

        let repo = req.query.permission_repo,
            users = req.entity;

        //TODO: of course, these links should only appear if logged in user has admin on the repo also
        if (repo) {
            users.forEach((user) => {
                user.links = [{
                    rel: 'edit-repo-permission',
                    href: 'users/' + user.username + '/repos/' + repo + '/permissions/{permission}',
                    method: 'PUT'
                }, {
                    rel: 'remove-repo-permission',
                    href: 'users/' + user.username + '/repos/' + repo,
                    method: 'DELETE'
                }];
            });
        }
        next();
    },

    readUser (req, res, next) {
        console.log('getting user [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        let username = req.params.username;
        userRepository.getUser(username).then((user) => {
            req.entity = user;
            next();
        }).catch((err) => {
            next(err);
        });
    }
};
