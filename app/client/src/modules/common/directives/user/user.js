'use strict';

module.exports = /*@ngInject*/
    function user() {
        return {
            templateUrl: 'common/directives/user/user.html',
            scope: {
                user: '='
            }
        };
    };
