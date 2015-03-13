'use strict';

module.exports = /*@ngInject*/
    function togglebuttons() {
        return {
            templateUrl: 'common/directives/togglebuttons.html',
            scope: {
                options: '=',
                value: '=',
                onChange: '&'
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function () {
                    console.log('binding toggle buttons controller', this);

                    //catch the individual click events and repackage them as a change
                    this.click = (value) => {
                        this.onChange({value: value});
                    };
                }
        };
    };
