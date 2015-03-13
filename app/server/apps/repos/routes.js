'use strict';
var repos = require('../../middleware/repos'),
    send = require('../../middleware/send'),
    permissions = require('../../middleware/permissions');

module.exports = {
    routes: {
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
        }
    }
};
