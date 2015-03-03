'use strict';

var userService = require('../services/github/users');

//TODO: it would be nice to map middleware names more closely to the hypermedia links they represent
module.exports = {

    list: function (req, res, next) {

        console.log('listing users [' + req.path + ']');
        console.log('query:' + JSON.stringify(req.query, null, 2));

        userService.get().then(function (users) {
            var logins = users.map(function (user) {
                return {
                    username: user.login
                };
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

    updateRepoPermission: function (req, res, next) {

        console.log('editing user repo permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    },

    deleteRepoPermission: function (req, res, next) {

        console.log('removing user repo permissions [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        res.status(204).end();

    }

};
