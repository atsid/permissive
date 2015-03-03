'use strict';

var userService = require('../services/github/users');

module.exports = {

    list: function (req, res, next) {

        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        var repo = req.query.permission_repo;

        userService.get().then(function (users) {

            var logins = users.map(function (user) {

                var outUser = {
                    username: user.login,
                    links: []
                };

                //TODO: of course, these links should only appear if logged in user has admin on the repo
                if (repo) {
                    outUser.links.push({
                        rel: 'edit-repo-permission',
                        href: 'users/' + outUser.username + '/repos/' + repo + '/permissions/{permission}',
                        method: 'PUT'
                    });
                    outUser.links.push({
                        rel: 'remove-repo-permission',
                        href: 'users/' + outUser.username + '/repos/' + repo,
                        method: 'DELETE'
                    });
                }

                return outUser;

            });

            res.json(logins);

        }).catch(function (err) {
            next(err);
        });

    },

    read: function (req, res, next) {

        console.log('getting user [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.json({
            username: req.params.username
        });

    },

    edit_repo_permission: function (req, res, next) {

        console.log('editing user repo permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    },

    remove_repo_permission: function (req, res, next) {

        console.log('removing user repo permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    }

};
