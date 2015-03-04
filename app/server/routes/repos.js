'use strict';
/**
 * Business logic routes for working with repos.
 */
var repos = require('../middleware/repos'),
    permissions = require('../middleware/permissions'),
    send = require('../middleware/send');

module.exports = {

    list: [repos.listRepos, repos.listReposPermission, repos.listReposLinks, send.json],

    read: [repos.readRepo, send.json],

    editUserPermission: [permissions.editRepoPermissionForUser, send.noContent],

    removeUserPermission: [permissions.removeRepoPermissionForUser, send.noContent]

};
