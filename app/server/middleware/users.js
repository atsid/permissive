'use strict';

var userService = require('../services/github/users'),
    send = require('./send'),
    permissions = require('./permissions');

function list_users(req, res, next) {

    console.log('listing users [' + req.path + ']');
    console.log('query:' + JSON.stringify(req.query, null, 2));

    userService.get().then(function (users) {

        req.entity = users.map(function (user) {
            return {
                username: user.login,
                name: user.name, //this actually requires a secondary lookup to user api, not members
                avatar_url: user.avatar_url
            };
        });

        next();

    }).catch(function (err) {
        next(err);
    });

}

function list_users_permission(req, res, next) {

    console.log('looking up repo permissions for users');

    var repo = req.query.permission_repo,
        users = req.entity;

    if (repo) {
        users.forEach(function (user) {
            user.permission = 'read';
        });
    }

    next();

}

function list_users_links(req, res, next) {

    console.log('checking for links on user list');

    var repo = req.query.permission_repo,
        users = req.entity;

    //TODO: of course, these links should only appear if logged in user has admin on the repo also
    if (repo) {
        users.forEach(function (user) {
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

}

function read_user(req, res, next) {

    console.log('getting user [' + req.path + ']');
    console.log('params:' + JSON.stringify(req.params, null, 2));

    req.entity = {
        username: req.params.username
    };

    next();

}

module.exports = {

    list: [list_users, list_users_permission, list_users_links, send.json],

    read: [read_user, send.json],

    edit_repo_permission: [permissions.edit_repo_permission_for_user, send.no_content],

    remove_repo_permission: [permissions.remove_repo_permission_for_user, send.no_content]

};
