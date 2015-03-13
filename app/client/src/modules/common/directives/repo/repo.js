'use strict';

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/repo/repo.html',
            scope: {
                repo: '='
            },
            controllerAs: 'ctrl',
            bindToController: true,
            controller: /*@ngInject*/
                function (usersService) {
                    this.toggled = false;

                    this.click = () => {
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
