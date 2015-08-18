'use strict';

var chai = require('chai'),
    github = require('./github.mock');

/**
 * Some simple tests to make sure we're mocking out the API repo correctly.
 * This includes primarily the assurance that fields that shouldn't be present are not,
 * and that we have some basic testing against methods that are always invoked indirectly
 * and are thus difficult to test via integration tests only.
 */
//jscs:disable disallowDanglingUnderscores
describe('github.mock.js', () => {

    it('getUsers ok', (done) => {

        github.getUsers().then((users) => {
            chai.assert.equal(users.length, 4);
            let user = users[0];
            chai.assert.ok(user.avatar_url);
            chai.assert.isUndefined(user.name);
            done();
        });

    });

    it('getUser ok', (done) => {

        github.getUser({user: 'testuser1'}).then((user) => {
            chai.assert.equal(user.login, 'testuser1');
            chai.assert.equal(user.name, 'TJ');
            chai.assert.ok(user.avatar_url);
            done();
        });

    });

    it('getUser fail', (done) => {

        github.getUser({user: 'nouser'}).then(() => {
            chai.assert.fail();
            done();
        }).catch((err) => {
            chai.assert.ok(err);
            done();
        });

    });

    it('getRepos ok', (done) => {

        github.getRepos().then((repos) => {
            chai.assert.equal(repos.length, 2);
            let repo = repos[0];
            //just confirm they're ok - we can't assert specifically because we don't enforce sorting
            chai.assert.ok(repo.id);
            chai.assert.ok(repo.name);
            chai.assert.ok(repo.description);
            chai.assert.isBoolean(repo.private);
            done();
        });

    });

    it('getCollaborators ok', (done) => {

        github.getCollaborators({repo: 'Test-Repo-1'}).then((users) => {
            chai.assert.equal(users.length, 2);
            chai.assert.equal(users[0].name, 'Wanstrath');
            done();
        });

    });

    it('getCollaborators fail', (done) => {

        github.getCollaborators({repo: 'norepo'}).then(() => {
            chai.assert.fail();
            done();
        }).catch((err) => {
            chai.assert.ok(err);
            done();
        });

    });

    it('getTeams ok', (done) => {

        github.getTeams().then((teams) => {
            chai.assert.equal(teams.length, 5);
            let team = teams[0];
            //just confirm they're ok - we can't assert specifically because we don't enforce sorting
            chai.assert.ok(team.id);
            chai.assert.ok(team.name);
            chai.assert.ok(team.permission);
            chai.assert.isUndefined(team._repos);
            chai.assert.isUndefined(team._users);
            done();
        });

    });

    it('getTeamMembers ok', (done) => {

        github.getTeamMembers({id: 4}).then((teamMembers) => {
            chai.assert.equal(teamMembers.length, 1);
            let member = teamMembers[0];
            chai.assert.equal(member.login, 'testuser3');
            chai.assert.ok(member.avatar_url);
            chai.assert.isUndefined(member.name);
            done();
        });

    });

    it('getTeamMembers fail', (done) => {

        github.getTeamMembers({id: 99}).then(() => {
            chai.assert.fail();
            done();
        }).catch((err) => {
            chai.assert.ok(err);
            done();
        });

    });

    it('getTeamRepos ok', (done) => {

        github.getTeamRepos({id: 3}).then((teamRepos) => {
            chai.assert.equal(teamRepos.length, 1);
            let repo = teamRepos[0];
            chai.assert.equal(repo.id, 1);
            chai.assert.equal(repo.name, 'Test-Repo-1');
            chai.assert.ok(repo.description);
            chai.assert.isFalse(repo.private);
            done();
        });

    });

    it('getTeamRepos fail', (done) => {

        github.getTeamRepos({id: 99}).then(() => {
            chai.assert.fail();
            done();
        }).catch((err) => {
            chai.assert.ok(err);
            done();
        });

    });
});
