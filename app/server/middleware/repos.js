'use strict';

module.exports = {

    listRepos: (req, res, next) => {
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
    },

    listReposPermission: (req, res, next) => {
        console.log('looking up user permission for repos');

        var user = req.query.permission_user,
            repos = req.entity;

        if (user) {
            repos.forEach(function (repo) {
                repo.permission = 'read';
            });
        }

        next();
    },

    listReposLinks: (req, res, next) => {
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
    },

    readRepo: (req, res, next) => {
        console.log('getting repo [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        req.entity = {
            id: req.params.id,
            name: 'stub-repo-' + req.params.id
        };

        next();
    }
};
