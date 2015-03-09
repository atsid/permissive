'use strict';

module.exports = /*@ngInject*/
    function navbar() {
        return {
            templateUrl: 'common/directives/navbar/navbar.html',
            scope: {},
            replace: true,
            controllerAs: 'ctrl',
            controller: /*@ngInject*/
                function () {
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
                }
        };
    };
