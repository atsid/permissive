'use strict';
module.exports = {
    listUsers: {
        method: 'get',
        path: '/users'
    },
    editPermission: {
        method: 'put',
        path: '/users/:username/repos/:id/permissions/:permission'
    }
};
