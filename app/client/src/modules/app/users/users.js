'use strict';

module.exports =
    angular.module('permissive.users', [
        //load your users submodules here, e.g.:
        //require('./bar').name
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                controller: 'usersController as ctrl'
            });
    })
    .controller('usersController', function ($http, usersService) {
        this.users = usersService.query();
    });
