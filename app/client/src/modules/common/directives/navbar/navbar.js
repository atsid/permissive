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
                    }, {
                        title: 'Teams',
                        sref: 'teams'
                    }, {
                        title: 'Org',
                        sref: 'organization'
                    }];
                    this.user = identityService.get();
                }
        };
    };
