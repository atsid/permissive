'use strict';

let links = require('../../../links'),
    permissions = require('../../../permissions'),
    buttonConfig = require('../config/permission-buttons');

module.exports = /*@ngInject*/
    () => {
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
                    this.editLink = links.findByRel(this.user.links, 'edit-repo-permission');
                    this.buttons = angular.copy(buttonConfig);
                    this.permission = this.user.permission;

                    //buttons display but are not clickable if the link isn't there
                    if (!this.editLink) {
                        this.buttons.forEach((btn) => btn.disabled = true);
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
