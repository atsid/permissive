'use strict';

let links = require('../../../links');

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

                    this.permission = 'none'; //TODO: pull from model

                    this.buttons = [{
                        label: 'NONE',
                        value: 'none',
                        selected: true
                    }, {
                        label: 'READ',
                        value: 'pull'
                    }, {
                        label: 'WRITE',
                        value: 'push'
                    }, {
                        label: 'ADMIN',
                        value: 'admin'
                    }];

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
