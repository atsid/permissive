'use strict';

module.exports =
    angular.module('permissive.organization', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('organization', {
                url: '/organization',
                templateUrl: 'app/organization/organization.html',
                controller: 'organizationController as ctrl'
            });
    })
    .controller('organizationController', function ($http, organizationService) {
        console.log('getting organization');
        organizationService.query().$promise.then(org => {
            this.users = org.users;
            delete org.users;
            this.organization = org;
        });

        this.getPermissions = (perms) => {
            if (!perms) {
                return 'NA';
            }
            let map = {
                pull: 'P--',
                push: 'PP-',
                admin: 'PPA'
            };
            return map[perms.github];
        };
    });
