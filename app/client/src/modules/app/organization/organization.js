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
            let organization = [];
            angular.forEach(org, (org, key) => {
                if (key.indexOf('$') !== 0) {
                    organization.push(org);
                }
            });

            this.organization = organization.sort(this.sortOrg);
        });

        this.sortOrg = (a, b) => {
            if(a.repo.name.toLowerCase() > b.repo.name.toLowerCase()) {
                return 1;
            } else if (a.repo.name.toLowerCase() < b.repo.name.toLowerCase()) {
                return -1;
            }
            return 0;
        };

        this.getPermissions = (perms) => {
            if (!perms) {
                return '-';
            }
            let map = {
                pull: 'R',
                push: 'W',
                admin: 'A',
                none: '-'
            };
            return map[perms.github];
        };
    });
