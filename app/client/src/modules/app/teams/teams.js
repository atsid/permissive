'use strict';

let links = require('../../links');

module.exports =
    angular.module('permissive.teams', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('teams', {
                url: '/teams',
                templateUrl: 'app/teams/teams.html',
                controller: 'teamsController as ctrl'
            });
    })
    .controller('teamsController', function ($http, linkService, teamsService) {
        console.log('getting list of teams');
        teamsService.query().$promise.then((teams) => {
            this.teams = teams;
        });
    });
