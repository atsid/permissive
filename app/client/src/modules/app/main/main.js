'use strict';

module.exports =
    angular.module('permissive.main', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'mainController as ctrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/main/login.html'
            });
    })
    .controller('mainController', function () {
        this.welcome = "Permissive";
    });
