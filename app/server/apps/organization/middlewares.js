'use strict';
var permissions = require('../../middleware/permissions'),
    send = require('../../middleware/send');

module.exports = {
    getOrganization: [
        permissions.getOrganization,
        send.json
    ]
};
