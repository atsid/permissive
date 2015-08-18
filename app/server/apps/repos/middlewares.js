'use strict';
var repos = require('../../middleware/repos'),
    send = require('../../middleware/send'),
    permissions = require('../../middleware/permissions');

module.exports = {
    listRepos: [
        repos.listRepos,
        repos.listReposPermission,
        repos.listReposLinks,
        send.json
    ],
    editPermission: [
        permissions.editRepoPermissionForUser,
        send.noContent
    ]
};
