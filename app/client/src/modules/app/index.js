'use strict';

module.exports =
    angular.module('permissive', [
        'ui.router',

        'ngMaterial',
        'ngResource',

        //html templates in $templateCache generated by Gulp:
        require('../../../tmp/templates').name,

        //general directives, filters, services shared across the app
        require('../common').name,

        require('./main/main').name,
        require('./users/users').name,
        require('./repos/repos').name,
        require('./teams/teams').name,
        require('./organization/organization').name

        //load other app modules here, e.g.:
        //require('./account').name
    ])
    .config(function ($urlRouterProvider, $httpProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('authInterceptor');

        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue');
    }).factory('authInterceptor', function ($q, $location) {
        return {
            responseError(response) {
                if (response.status === 401) {
                    console.log('redirecting to login');
                    $location.path('/login');
                    //$cookieStore.remove('token');
                }

                return $q.reject(response);
            }
        };
    });
