'use strict';
var auth = require('../../middleware/authenticate'),
    users = require('../../middleware/users'),
    permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send');
module.exports = {
    pre: {
        all: [auth.isAuthenticated]
    },
    routes: {
        '/users': {
            get: [
                users.listUsers,
                users.listUsersPermission,
                users.listUsersLinks,
                send.json
            ]
        },

        '/users/:username/repos/:id/permissions/:permission': {
            put: [
                permissions.createTeamForRepoPermission,
                permissions.editRepoPermissionForUser,
                send.noContent
            ]
        }
    }
};
