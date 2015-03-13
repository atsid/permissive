'use strict';

/**
 * Simple function that hashes a list of objects, using a specified property as the key.
 * @param list
 * @param key
 */
module.exports = (list, key) => {
    let hash = {};
    list.forEach((item) => {
        hash[item[key]] = item;
    });
    return hash;
};
