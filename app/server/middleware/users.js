'use strict';

var userPath = '../components/repositories/users',
    mock = process.env.SERVICE === 'mock' ? '.mock' : "",
    userService = require(userPath + mock),
    Bluebird = require('bluebird');

console.log('loading users at repository: ' + userPath + mock);
module.exports = {

    listUsers (req, res, next) {
        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        userService.getUsers().then((users) => {
            let profiles = [];

            users.forEach((user) => {
                profiles.push(userService.getUser(user.login).then((profile) => {
                    user.name = profile.name;
                }));
            });

            Bluebird.all(profiles).then(() => {
                console.log('all user profiles retrieved');

                req.entity = users.map((user) => {
                    return {
                        username: user.login,
                        name: user.name,
                        avatar_url: user.avatar_url
                    };
                });

                next();
            });

        }).catch((err) => {
            next(err);
        });
    },

    listUsersPermission (req, res, next) {
        console.log('looking up repo permissions for users');

        let repo = req.query.permission_repo,
            users = req.entity;

        if (repo) {
            users.forEach((user) => {
                user.permission = 'read';
            });
        }
        next();
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

        userService.getUser(req.params.username).then((profile) => {
            req.entity = {
                username: profile.login,
                name: profile.name,
                avatar_url: profile.avatar_url
            };

            next();

        }).catch((err) => {
            next(err);
        });
    }
};
