'use strict';
/**
 * Business logic routes for working with repos.
 */
var repos = require('../middleware/repos'),
    permissions = require('../middleware/permissions'),
    send = require('../middleware/send');

module.exports = {

    list: [repos.list_repos, repos.list_repos_permission, repos.list_repos_links, send.json],

    read: [repos.read_repo, send.json],

    edit_user_permission: [permissions.edit_repo_permission_for_user, send.no_content],

    remove_user_permission: [permissions.remove_repo_permission_for_user, send.no_content]

};
