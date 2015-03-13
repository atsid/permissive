'use strict';

let levels = {
    'none': 0,
    'pull': 1,
    'push': 2,
    'admin': 3
};

/**
 * Utilities for working with permission levels.
 */
module.exports = {

    /**
     * Returns the highest permission within a list of permissions.
     * @param list - array of permission strings (e.g., 'push', 'pull').
     */
    highest (list) {
        let max = 'none';
        list.forEach((perm) => {
            if (levels[perm] > levels[max]) {
                max = perm;
            }
        });
        return max;
    },

    /**
     * Indicates if the left side permission is greater than the right side.
     * @param left
     * @param right
     */
    greaterThan (left, right) {
        return levels[left] > levels[right];
    }

};
