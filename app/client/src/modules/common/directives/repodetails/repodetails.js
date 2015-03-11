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
                function () {
                    console.log('binding repo details controller', this);
                }
        };
    };
