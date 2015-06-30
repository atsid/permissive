'use strict';
var identity = require('../../middleware/identity'),
    send = require('../../middleware/send');

module.exports = {
    getIdentity: [
        identity.getIdentity,
        send.json
    ]
};
