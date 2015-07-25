'use strict';

var teamRepository = require('../components/repositories/teams'),
    collaboratorRepository = require('../components/repositories/collaborators'),
    debug = require('debug')('app:middleware:identity'),
    Link = require('../links/Link');

module.exports = {
    listTeams (req, res, next) {
        debug('get teams [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        teamRepository.getTeams().then(teams => {
            req.entity = teams;
            next();
        }).catch(err => next(err));
    },

    listTeamsLinks(req, res, next) {
        debug('checking for links on teams list');

        let teams = req.entity;
        teams.forEach(team => {
            let convertLink = new Link({
                rel: 'convert-team',
                appMethod: 'teams.convertTeam',
                params: {
                    id: team.id
                }
            });
            team.links = [convertLink];
        });
        next();
    },

    convertTeam(req, res, next) {
        debug('get teams [' + req.path + ']');
        debug('query:' + JSON.stringify(req.query, null, 2));

        let teamId = req.params.id;

        collaboratorRepository.addCollaboratorsFromTeam(teamId).then(() => {
            next();
        }).catch(err => next(err));
    }
};
