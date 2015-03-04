'use strict';
/**
 * Business logic routes for working with user objects
 */
var users = require('../middleware/users'),
    permissions = require('../middleware/permissions'),
    send = require('../middleware/send');

module.exports = {

    list: [users.list_users, users.list_users_permission, users.list_users_links, send.json],

    read: [users.read_user, send.json],

    edit_repo_permission: [permissions.edit_repo_permission_for_user, send.no_content],

    remove_repo_permission: [permissions.remove_repo_permission_for_user, send.no_content]

};
