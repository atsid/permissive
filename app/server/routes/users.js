'use strict';
/**
 * Business logic routes for working with user objects
 */
var users = require('../middleware/users'),
    permissions = require('../middleware/permissions'),
    send = require('../middleware/send');

module.exports = {

    list: [users.listUsers, users.listUsersPermission, users.listUsersLinks, send.json],

    read: [users.readUser, send.json],

    editRepoPermission: [permissions.editRepoPermissionForUser, send.noContent],

    removeRepoPermission: [permissions.removeRepoPermissionForUser, send.noContent]

};
