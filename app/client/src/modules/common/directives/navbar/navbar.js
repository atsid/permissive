'use strict';

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/navbar/navbar.html',
            scope: {},
            replace: true,
            controllerAs: 'ctrl',
            controller: /*@ngInject*/
                function (identityService) {
                    this.menu = [{
                        title: 'Home',
                        sref: 'main'
                    }, {
                        title: 'Users',
                        sref: 'users'
                    }, {
                        title: 'Repos',
                        sref: 'repos'
                    }];
                    this.user = identityService.query();
                }
        };
    };
