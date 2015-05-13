'use strict';
var users = require('../../middleware/users'),
    send = require('../../middleware/send'),
    permissions = require('../../middleware/permissions');

module.exports = {
    listUsers: [
        users.listUsers,
        users.listUsersPermission,
        users.listUsersLinks,
        send.json
    ],
    editPermission: [
        permissions.createTeamForRepoPermission,
        permissions.editRepoPermissionForUser,
        send.noContent
    ]
};
