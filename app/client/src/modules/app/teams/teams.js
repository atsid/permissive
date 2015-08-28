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
    .controller('teamsController', function (teamsService) {
        console.log('getting list of teams');
        this.teams = teamsService.query();
    });
