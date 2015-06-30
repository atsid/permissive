'use strict';

module.exports = /*@ngInject*/
    () => {
        return {
            templateUrl: 'common/directives/loadingDialog.html',
            replace: true,
            scope: {
                loadingDialog: '='
            },
            link:
                (scope, ele, attr) => {
                    scope.$watch('loadingDialog', (val) => {
                        if (!val) {
                            ele.css('display', 'block');
                        } else {
                            ele.css('display', 'none');
                        }
                    });
                }
        };
    };
