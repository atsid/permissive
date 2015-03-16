'use strict';
var auth = require('../../middleware/authenticate'),
    users = require('../../middleware/users'),
    permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send');
module.exports = {
    routes: {
        list: {
            method: 'GET',
            path: '/users',
            middleware: [
                auth.isAuthenticated,
                users.listUsers,
                users.listUsersPermission,
                users.listUsersLinks,
                send.json
            ]
        },
        read: {
            method: 'GET',
            path: '/users/:username',
            middleware: [
                auth.isAuthenticated,
                users.readUser,
                send.json
            ]
        },
        editRepoPermission: {
            method: 'PUT',
            path: '/users/:username/repos/:id/permissions/:permission',
            middleware: [
                auth.isAuthenticated,
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
