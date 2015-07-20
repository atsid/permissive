'use strict';

var orgUtil = require('./util/organization');

module.exports = {
    /**
     * Gets the Organization map
     */
    getOrganization () {
        return orgUtil.getOrganization();
    }
};
