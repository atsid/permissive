'use strict';

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
                    this.permissionClick = (link, permission) => {
                        console.log('permission clicked', permission);

                        linkService.exec(link, {
                            permission: permission
                        });
                    };
                }
        };
    };
