'use strict';

module.exports =
    angular.module('permissive.main', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'mainController as ctrl'
            });
    })
    .controller('mainController', function () {
        this.welcome = "Permissive";
    });
