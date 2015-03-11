'use strict';

module.exports = /*@ngInject*/
    function repo() {
        return {
            templateUrl: 'common/directives/repo/repo.html',
            scope: {
                repo: '='
            },
            controllerAs: 'repoCtrl',
            bindToController: true,
            controller: /*@ngInject*/
                function (usersService) {
                    this.toggled = false;

                    this.repoClick = () => {
                        console.log('repo click ' + this.repo.name);
                        this.toggled = !this.toggled;
                        if (this.toggled && !this.users) {
                            this.users = usersService.query({
                                permission_repo: this.repo.id
                            });
                        }
                    };
                }
        };
    };
