'use strict';

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/team/team.html',
            scope: {
                team: '='
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function () {
                    this.toggled = false;

                    this.click = () => {
                        console.log('team click ' + this.team.name);
                        this.toggled = !this.toggled;
                        if (this.toggled && !this.repos) {
                            this.repos = this.team.repos;
                            this.users = this.team.users;
                        }
                    };
                }
        };
    };
