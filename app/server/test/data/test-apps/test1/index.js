'use strict';
module.exports = {
    list: {
        method: 'GET',
        path: '/test-path',
        middleware: [function (req, res, next) {}]
    },
    read: {
        method: 'GET',
        path: '/test-path/:id',
        middleware: [function (req, res, next) {}]
    }
};
