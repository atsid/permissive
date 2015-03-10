'use strict';

module.exports =
    angular.module('permissive.repos', [
        //load your users submodules here, e.g.:
        //require('./bar').name
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('repos', {
                url: '/repos',
                templateUrl: 'app/repos/repos.html',
                controller: 'reposController as ctrl'
            });
    })
    .controller('reposController', function ($http, reposService) {
        this.repos = reposService.query();
    });
