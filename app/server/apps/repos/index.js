'use strict';
/**
 * Business logic routes for working with repos.
 */
var repos = require('../../middleware/repos'),
    permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send'),
    auth = require('../../middleware/authenticate');

module.exports = {
    list: {
        method: 'GET',
        path: '/repos',
        middleware: [
            auth.isAuthenticated,
            repos.listRepos,
            repos.listReposPermission,
            repos.listReposLinks,
            send.json
        ]
    },
    read: {
        method: 'GET',
        path: '/repos/:id',
        middleware: [
            auth.isAuthenticated,
            repos.readRepo,
            send.json
        ]
    },
    editUserPermission: {
        method: 'PUT',
        path: '/repos/:id/users/:username/permissions/:permission',
        middleware: [
            auth.isAuthenticated,
            permissions.editRepoPermissionForUser,
            send.noContent
        ]
    },
    removeUserPermission: {
        method: 'DELETE',
        path: '/repos/:id/users/:username',
        middleware: [
            auth.isAuthenticated,
            permissions.removeRepoPermissionForUser,
            send.noContent
        ]
    }
};
