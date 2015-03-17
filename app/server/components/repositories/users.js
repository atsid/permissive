'use strict';

var userUtil = require('./util/users'),
    Bluebird = require('bluebird');

module.exports = {

    getUsers () {
        return userUtil.getGithubUsers().then(users => {
            let profiles = users.map(user => userUtil.getGithubUser(user.username).then(profile => user.name = profile.name));
            return Bluebird.all(profiles).then(() => users);
        });
    },

    isOrgMember (username) {
        return new Promise((resolve, reject) => {
            userUtil.isOrgMember(username).then(function (data) {
                resolve(data.meta.status === '204 No Content');
            });
        });
    }
};
