'use strict';

var userUtil = require('./util/users'),
    Bluebird = require('bluebird'),
    permUtil = require('./util/permissions');

module.exports = {

    getUsers () {
        return userUtil.getGithubUsers().then(users => {
            let profiles = users.map(user => userUtil.getGithubUser(user.username).then(profile => user.name = profile.name));
            return Bluebird.all(profiles).then(() => users);
        });
    },

    isOrgMember (username) {
        return userUtil.isOrgMember(username).then(function (data) {
            return "204 No Content" === data.meta.success;
        });
    }
};
