'use strict';
var auth = require('../../middleware/authenticate'),
    repos = require('../../middleware/repos'),
    send = require('../../middleware/send'),
    permissions = require('../../middleware/permissions');

module.exports = {
    routes: {
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
        editUserPermission: {
            method: 'PUT',
            path: '/repos/:id/users/:username/permissions/:permission',
            middleware: [
                auth.isAuthenticated,
                permissions.createTeamForRepoPermission,
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
