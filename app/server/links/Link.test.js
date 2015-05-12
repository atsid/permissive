'use strict';

let Link = require('./Link'),
    expect = require('chai').expect;

describe('Link.test.js', () => {

    it('link is correctly constructed using params and app/method lookup', () => {

        let editLink = new Link({
            rel: 'edit-repo-permission',
            appMethod: 'users.editPermission',
            params: {
                id: 89,
                username: 'octocat'
            }
        });

        expect(editLink.rel).to.equal('edit-repo-permission');
        expect(editLink.href).to.equal('/api/v1/users/octocat/repos/89/permissions/{permission}');
        expect(editLink.method).to.equal('PUT');

    });

});
