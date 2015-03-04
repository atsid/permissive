'use strict';
/**
 * Business logic routes for working with repos.
 */
var repos = require('../middleware/repos'),
    permissions = require('../middleware/permissions'),
    send = require('../middleware/send'),
    routes = {
        list: {
            method: 'GET',
            path: '/repos',
            middleware: [
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
                repos.readRepo,
                send.json
            ]
        },
        editUserPermission: {
            method: 'PUT',
            path: '/repos/:id/users/:username/permissions/:permission',
            middleware: [
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        },
        removeUserPermission: {
            method: 'DELETE',
            path: '/repos/:id/users/:username',
            middleware: [
                permissions.removeRepoPermissionForUser,
                send.noContent
            ]
        }
    };

module.exports = {
    create: function () {
        var wire = require('../wire');
        return wire(routes);
    }
};
