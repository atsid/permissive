'use strict';

var send = require('./send'),
    permissions = require('./permissions');

function list_repos(req, res, next) {

    console.log('listing repos [' + req.path + ']');
    console.log('query:' + JSON.stringify(req.query, null, 2));

    req.entity = [{
        id: 1,
        name: 'stub-repo-1'
    }, {
        id: 2,
        name: 'stub-repo-2'
    }];

    next();

}

function list_repos_permission(req, res, next) {

    console.log('looking up user permission for repos');

    var user = req.query.permission_user,
        repos = req.entity;

    if (user) {
        repos.forEach(function (repo) {
            repo.permission = 'read';
        });
    }

    next();

}

function list_repos_links(req, res, next) {

    console.log('checking for links on repo list');

    var user = req.query.permission_user,
        repos = req.entity;

    if (user) {
        repos.forEach(function (repo) {
            repo.links = [{
                rel: 'edit-user-permission',
                href: 'repos/' + repo.id + '/users/' + user + '/permissions/{permission}',
                method: 'PUT'
            }, {
                rel: 'remove-user-permission',
                href: 'repos/' + repo.id + '/users/' + user,
                method: 'DELETE'
            }];
        });
    }

    next();

}

function read_repo(req, res, next) {

    console.log('getting repo [' + req.path + ']');
    console.log('params:' + JSON.stringify(req.params, null, 2));

    req.entity = {
        id: req.params.id,
        name: 'stub-repo-' + req.params.id
    };

    next();

}

module.exports = {

    list: [list_repos, list_repos_permission, list_repos_links, send.json],

    read: [read_repo, send.json],

    edit_user_permission: [permissions.edit_repo_permission_for_user, send.no_content],

    remove_user_permission: [permissions.remove_repo_permission_for_user, send.no_content]

};
