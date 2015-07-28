'use strict';
module.exports = {
    listTeams: {
        method: 'get',
        path: '/teams'
    },
    convertTeam: {
        method: 'put',
        path: '/teams/:id/'
    }
};
