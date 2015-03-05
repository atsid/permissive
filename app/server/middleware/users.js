'use strict';

var userService = require('../services/github/users');

module.exports = {

    listUsers: (req, res, next) => {
        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        userService.get().then((users) => {

            req.entity = users.map((user) => {
                return {
                    username: user.login,
                    name: user.name, //this actually requires a secondary lookup to user api, not members
                    avatar_url: user.avatar_url
                };
            });

            next();

        }).catch((err) => {
            next(err);
        });
    },

    listUsersPermission: (req, res, next) => {
        console.log('looking up repo permissions for users');

        var repo = req.query.permission_repo,
            users = req.entity;

        if (repo) {
            users.forEach((user) => {
                user.permission = 'read';
            });
        }

        next();
    },

    listUsersLinks: (req, res, next) => {
        console.log('checking for links on user list');

        var repo = req.query.permission_repo,
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

    readUser: (req, res, next) => {
        console.log('getting user [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        req.entity = {
            username: req.params.username
        };

        next();
    }
};
