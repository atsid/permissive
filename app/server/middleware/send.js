'use strict';
/**
 * Standard sending middleware functions.
 */
module.exports = {

    delay (req, res, next) {
        let delay = req.query.delay;
        if (delay > 0) {
            setTimeout(() => {
                next();
            }, delay);
        } else {
            next();
        }
    },

    json (req, res, next) {
        res.json(req.entity);
    },

    noContent (req, res, next) {
        res.status(204).end();
    }
};
