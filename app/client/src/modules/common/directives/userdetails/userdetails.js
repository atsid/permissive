'use strict';

let links = require('../../../links'),
    permissions = require('../../../permissions'),
    buttonConfig = require('../config/permission-buttons');

module.exports = /*@ngInject*/
    function userdetails() {
        return {
            templateUrl: 'common/directives/userdetails/userdetails.html',
            scope: {
                user: '=userdetails'
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function (linkService) {
                    console.log('binding user details controller', this);
                    this.editLink = links.findByRel('edit-repo-permission', this.user.links);
                    this.buttons = angular.copy(buttonConfig);

                    let perm = this.user.permission;

                    if (perm) {
                        this.permission = permissions.highest([perm.permissive, perm.github]);
                        this.buttons.forEach((button) => {
                            button.disabled = permissions.greaterThan(perm.github, button.value);
                        });
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
