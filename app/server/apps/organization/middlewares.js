'use strict';
var organization = require('../../middleware/organization'),
    send = require('../../middleware/send');

module.exports = {
    getOrganization: [
        organization.getOrganization,
        send.json
    ]
};
