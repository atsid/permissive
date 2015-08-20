'use strict';

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/teamdetails/teamdetails.html',
            scope: {
                team: '=teamdetails'
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function () {
                    console.log('binding team details controller', this);
                }
        };
    };
