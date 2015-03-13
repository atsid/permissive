'use strict';

let links = require('../../../links'),
    permissions = require('../../../permissions'),
    buttonConfig = require('../config/permission-buttons');

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/repodetails/repodetails.html',
            scope: {
                repo: '=repodetails'
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function (linkService) {
                    console.log('binding repo details controller', this);

                    this.editLink = links.findByRel('edit-user-permission', this.repo.links);
                    this.buttons = angular.copy(buttonConfig);

                    let perm = this.repo.permission;

                    if (perm) {
                        this.permission = permissions.highest([perm.permissive, perm.github]);
                        this.github = permissions.friendly(perm.github);
                    }

                    this.handlePermissionChange = (value) => {
                        console.log('permission change', value);
                        this.permission = value;
                        linkService.exec(this.editLink, {
                            permission: this.permission
                        });
                    };

                }
        };
    };
