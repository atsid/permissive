'use strict';

var repoService = require('../components/repositories/repos');

module.exports = {

    listRepos: (req, res, next) => {
        console.log('listing repos [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        repoService.getRepos().then((repos) => {

            req.entity = repos.map((repo) => {
                return {
                    'id': repo.id,
                    'name': repo.name,
                    'description': repo.description,
                    'public': !repo.private
                };
            });

            next();

        }).catch((err) => {
            next(err);
        });
    },

    listReposPermission: (req, res, next) => {
        console.log('looking up user permission for repos');

        let user = req.query.permission_user,
            repos = req.entity;

        if (user) {
            repos.forEach((repo) => {
                repo.permission = 'read';
            });
        }
        next();
    },

    listReposLinks: (req, res, next) => {
        console.log('checking for links on repo list');

        let user = req.query.permission_user,
            repos = req.entity;

        if (user) {
            repos.forEach((repo) => {
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

        repoService.getRepos().then((repos) => {

            let repo = repos.find((r) => {
                return r.id === parseInt(req.params.id, 10);
            });

            req.entity = {
                'id': repo.id,
                'name': repo.name,
                'description': repo.description,
                'public': !repo.private
            };

            next();

        }).catch((err) => {
            next(err);
        });
    }
};
