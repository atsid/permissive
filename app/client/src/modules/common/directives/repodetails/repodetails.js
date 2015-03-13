'use strict';

let links = require('../../../links'),
    hash = require('../../../hash'),
    buttons = require('../config/permission-buttons'),
    buttonHash = hash(buttons, 'value');

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

                    //TODO: clone
                    this.buttons = buttons.map((button) => {
                        return {
                            label: button.label,
                            value: button.value,
                            level: button.level
                        };
                    });

                    let perm = this.repo.permission;

                    if (perm) {
                        this.permission = perm.permissive;
                        this.github = perm.github;
                        this.buttons.forEach((button) => {
                            button.disabled = buttonHash[this.github].level > button.level;
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
