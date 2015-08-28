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
            org.repos.sort(this.sortOrg);
            this.repos = org.repos;
        });

        this.sortOrg = (a, b) => {
            return a.name.localeCompare(b.name);
        };

        this.getPermissions = (user, collaborator) => {
            let perm = '';
            if (user.owner) {
                perm = 'O';
            } else if (collaborator && collaborator.permission) {
                perm = {
                    pull: 'R',
                    push: 'W',
                    admin: 'A'
                }[collaborator.permission];
            }
            return perm;
        };
    });
