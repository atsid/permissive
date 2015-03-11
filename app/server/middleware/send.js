'use strict';
/**
 * Standard sending middleware functions.
 */
module.exports = {

    json (req, res, next) {
        res.json(req.entity);
    },

    noContent (req, res, next) {
        res.status(204).end();
    }
};
