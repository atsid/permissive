'use strict';
var users = require('../../middleware/users'),
    permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send');
module.exports = {
    routes: {
        list: {
            method: 'GET',
            path: '/users',
            middleware: [
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
                users.readUser,
                send.json
            ]
        },
        editRepoPermission: {
            method: 'PUT',
            path: '/users/:username/repos/:id/permissions/:permission',
            middleware: [
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
