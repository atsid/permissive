'use strict';

var teamUtil = require('./util/teams'),
	repoUtil = require('./util/repos'),
    userUtil = require('./util/users'),
    Bluebird = require('bluebird');

module.exports = {

    removeCollaboratorFromRepo(repo, user) {
        return repoUtil.removeCollaborator(repo, user);
    },

    addCollaboratorToRepo(repo, user) {
        return repoUtil.addCollaborator(repo, user);
    }
};
