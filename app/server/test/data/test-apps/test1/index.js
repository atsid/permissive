'use strict';
module.exports = {
    list: {
        method: 'GET',
        path: '/test-path',
        middleware: [function () {}]
    },
    read: {
        method: 'GET',
        path: '/test-path/:id',
        middleware: [function () {}]
    }
};
