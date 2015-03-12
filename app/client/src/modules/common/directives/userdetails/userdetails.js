'use strict';

let links = require('../../../links'),
    buttons = require('../config/permission-buttons');

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

                    this.permission = 'none'; //TODO: pull from model

                    this.buttons = buttons;

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
