'use strict';
var teams = require('../../middleware/teams'),
    send = require('../../middleware/send');

module.exports = {
    listTeams: [
        teams.listTeams,
        send.json
    ]
};
