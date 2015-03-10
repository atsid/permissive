'use strict';

module.exports = /*@ngInject*/
    function repo() {
        return {
            templateUrl: 'common/directives/repo/repo.html',
            scope: {
                repo: '='
            }
        };
    };
