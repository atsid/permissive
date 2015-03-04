'use strict';
/**
 * Middleware to adjust user permission levels on a repo.
 */
module.exports = {

    editRepoPermissionForUser: function (req, res, next) {
        console.log('editing user repo permission level [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));
        next();
    },

    removeRepoPermissionForUser: function (req, res, next) {
        console.log('removing user repo permission level [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));
        next();
    }
};
