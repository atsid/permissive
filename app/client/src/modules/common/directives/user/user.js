'use strict';

module.exports = /*@ngInject*/
    function user(/* inject dependencies here, i.e. : $rootScope */) {
        return {
            templateUrl: 'common/directives/user/user.html',
            controllerAs: 'ctrl',
            scope: {
                user: '='
            }
        };
    };
