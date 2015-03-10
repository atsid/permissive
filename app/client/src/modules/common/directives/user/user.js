'use strict';

module.exports = /*@ngInject*/
    function user() {
        return {
            templateUrl: 'common/directives/user/user.html',
            scope: {
                user: '='
            },
            controllerAs: 'userCtrl',
            bindToController: true,
            controller: /*@ngInject*/
                function (reposService) {
                    console.log('binding controller for', this);
                    // use this var to toggle a class using ng-class="{visible: ctrl.toggled}"
                    // in the view to toggle a div where the repos will show up
                    this.toggled = false;

                    this.userClick = () => {
                        console.log('user click ' + this.user.username);
                        this.toggled = !this.toggled;
                        if (this.toggled && !this.repos) {
                            this.repos = reposService.query({
                                permission_user: this.user.username
                            });
                        }
                    };
                    console.log(this);
                }
        };
    };
