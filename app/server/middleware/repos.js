'use strict';

module.exports = {

    list: function (req, res, next) {

        console.log('listing repos [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        res.json([{
            id: 1,
            name: 'stub-repo-1'
        }, {
            id: 2,
            name: 'stub-repo-2'
        }]);

    },

    read: function (req, res, next) {

        console.log('getting repo [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.json({
            id: req.params.id,
            name: 'stub-repo-' + req.params.id
        });

    },

    updateUserPermission: function (req, res, next) {

        console.log('editing repo user permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    },

    deleteUserPermission: function (req, res, next) {

        console.log('removing repo user permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    }

};
