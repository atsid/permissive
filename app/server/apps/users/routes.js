'use strict';
var auth = require('../../middleware/auth'),
    users = require('../../middleware/users'),
    permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send');
module.exports = {
    routes: {
        list: {
            method: 'GET',
            path: '/users',
            middleware: [
                auth.authenticate,
                users.listUsers,
                users.listUsersPermission,
                users.listUsersLinks,
                send.json
            ]
        },
        editRepoPermission: {
            method: 'PUT',
            path: '/users/:username/repos/:id/permissions/:permission',
            middleware: [
                auth.authenticate,
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
