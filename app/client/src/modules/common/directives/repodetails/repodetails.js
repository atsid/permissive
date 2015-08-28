'use strict';

let links = require('../../../links'),
    permissions = require('../../../permissions'),
    buttonConfig = require('../config/permission-buttons');

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/repodetails/repodetails.html',
            scope: {
                repo: '=repodetails',
                user: '=repouser'
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function (linkService, identityService, $mdDialog) {
                    console.log('binding repo details controller', this);

                    this.editLink = links.findByRel(this.repo.links, 'edit-user-permission');
                    this.buttons = angular.copy(buttonConfig);
                    this.permission = this.repo.permission;

                    //buttons display but are not clickable if the link isn't there
                    if (!this.editLink) {
                        this.buttons.forEach((btn) => btn.disabled = true);
                    }

                    this.handlePermissionChange = (value) => {
                        console.log('permission change', value);
                        if (!this.identity) {
                            this.identity = identityService.get(() => {
                                this.validateChange(value);
                            });
                        } else {
                            this.validateChange(value);
                        }
                    };

                    this.validateChange = (value) => {
                        // confirmation for users trying to remove their own admin perms
                        if (this.identity.username === this.user.username && this.permission === 'admin') {
                            let confirm = $mdDialog.confirm()
                                .title('Warning!')
                                .content('Are you sure you want to remove your own admin permissions from this repo?')
                                .cancel('Cancel')
                                .ok('Confirm');
                            $mdDialog.show(confirm).then(() => {
                                this.executeChange(value);
                            });
                        } else {
                            this.executeChange(value);
                        }
                    };

                    this.executeChange = (value) => {
                        this.permission = value;
                        linkService.exec(this.editLink, {
                            permission: this.permission
                        });
                    };

                }
        };
    };
