'use strict';
var auth = require('../../middleware/auth'),
    repos = require('../../middleware/repos'),
    send = require('../../middleware/send'),
    permissions = require('../../middleware/permissions');

module.exports = {
    routes: {
        list: {
            method: 'GET',
            path: '/repos',
            middleware: [
                auth.authenticate,
                repos.listRepos,
                repos.listReposPermission,
                repos.listReposLinks,
                send.json
            ]
        },
        editUserPermission: {
            method: 'PUT',
            path: '/repos/:id/users/:username/permissions/:permission',
            middleware: [
                auth.authenticate,
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
