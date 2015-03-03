'use strict';

module.exports = {

    list: function (req, res, next) {

        console.log('listing repos [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        var user = req.query.permission_user,
            stubs = [{
                id: 1,
                name: 'stub-repo-1',
                links: []
            }, {
                id: 2,
                name: 'stub-repo-2',
                links: []
            }];

        if (user) {
            stubs.forEach(function (stub) {
                stub.links.push({
                    rel: 'edit-user-permission',
                    href: 'repos/' + stub.id + '/users/' + user + '/permissions/{permission}',
                    method: 'PUT'
                });
                stub.links.push({
                    rel: 'remove-user-permission',
                    href: 'repos/' + stub.id + '/users/' + user,
                    method: 'DELETE'
                });
            });
        }

        res.json(stubs);

    },

    read: function (req, res, next) {

        console.log('getting repo [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.json({
            id: req.params.id,
            name: 'stub-repo-' + req.params.id
        });

    },

    edit_user_permission: function (req, res, next) {

        console.log('editing repo user permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    },

    remove_user_permission: function (req, res, next) {

        console.log('removing repo user permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    }

};
