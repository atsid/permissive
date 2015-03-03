'use strict';
/**
 * Middleware to adjust user permission levels on a repo.
 */
module.exports = {

    edit_repo_permission_for_user: function (req, res, next) {

        console.log('editing user repo permission level [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        next();

    },

    remove_repo_permission_for_user: function (req, res, next) {

        console.log('removing user repo permission level [' + req.path + ']');
        console.log('params:' + JSON.stringify(req.params, null, 2));

        next();

    }

};
