'use strict';
/**
 * Business logic routes for working with user objects
 */
var users = require('../../middleware/users'),
    permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send'),
    auth = require('../../authenticate');

module.exports = {
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
    },
    removeRepoPermission: {
        method: 'DELETE',
        path: '/users/:username/repos/:id',
        middleware: [
            auth.isAuthenticated,
            permissions.removeRepoPermissionForUser,
            send.noContent
        ]
    }
};
