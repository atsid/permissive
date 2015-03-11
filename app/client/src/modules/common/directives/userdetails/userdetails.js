'use strict';

module.exports = /*@ngInject*/
    function userdetails() {
        return {
            templateUrl: 'common/directives/userdetails/userdetails.html',
            scope: {
                user: '=userdetails'
            },
            controllerAs: 'userCtrl',
            bindToController: true,
            controller: /*@ngInject*/
                function () {
                    console.log('binding user details controller', this);
                }
        };
    };
