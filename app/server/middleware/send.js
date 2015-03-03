'use strict';
/**
 * Standard sending middleware functions.
 */
module.exports = {

    json: function (req, res, next) {
        res.json(req.entity);
    },

    no_content: function (req, res, next) {
        res.status(204).end();
    }

};
