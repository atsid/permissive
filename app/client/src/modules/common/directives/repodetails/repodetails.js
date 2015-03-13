'use strict';

let links = require('../../../links'),
    buttons = require('../config/permission-buttons');

module.exports = /*@ngInject*/
    function repodetails() {
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

                    let perm = this.repo.permission;
                    if (perm) {
                        this.permission = perm.permissive;
                        this.github = perm.github;
                    }

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
