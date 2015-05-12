'use strict';
module.exports = {
    listRepos: {
        method: 'get',
        path: '/repos'
    },
    editPermission: {
        method: 'put',
        path: '/repos/:id/users/:username/permissions/:permission'
    }
};
