'use strict';
var auth = require('../../middleware/authenticate'),
    repos = require('../../middleware/repos'),
    send = require('../../middleware/send'),
    permissions = require('../../middleware/permissions');

module.exports = {
    pre: {
        all: [auth.isAuthenticated]
    },
    routes: {
        '/repos': {
            get: [
                repos.listRepos,
                repos.listReposPermission,
                repos.listReposLinks,
                send.json
            ]
        },

        '/repos/:id/users/:username/permissions/:permission': {
            put: [
                permissions.createTeamForRepoPermission,
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
