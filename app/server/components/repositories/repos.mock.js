'use strict';

var repos = [{
    id: 1,
    name: 'Test Repo 1',
    private: false
}, {
    id: 2,
    name: 'Test Repo 2',
    private: true
}];

module.exports = {
    getRepos () {
        console.log('looking up mock repos');
        return new Promise((resolve, reject) => {
            resolve(repos);
        });
    }
};
