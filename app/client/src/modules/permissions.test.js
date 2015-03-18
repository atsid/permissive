'use strict';
let chai = require('chai'),
    permissions = require('./permissions');

describe('permission.js', () => {

    describe('highest', () => {

        it('finds highest permission in an ordered list', () => {
            let highest = permissions.highest(['pull', 'push']);
            chai.assert.equal('push', highest);
        });

        it('finds highest permission in an unordered list', () => {
            let highest = permissions.highest(['admin', 'pull', 'push']);
            chai.assert.equal('admin', highest);
        });

    });

    describe('greaterThan', () => {

        it('[pull] is higher than [none]', () => {
            chai.assert.isTrue(permissions.greaterThan('pull', 'none'));
        });

        it('[push] is higher than [none]', () => {
            chai.assert.isTrue(permissions.greaterThan('push', 'none'));
        });

        it('[push] is higher than [pull]', () => {
            chai.assert.isTrue(permissions.greaterThan('push', 'pull'));
        });

        it('[admin] is higher than [push]', () => {
            chai.assert.isTrue(permissions.greaterThan('admin', 'push'));
        });

    });

    describe('friendly', () => {

        it('pull === read', () => {
            chai.assert.equal('read', permissions.friendly('pull'));
        });

        it('push === write', () => {
            chai.assert.equal('write', permissions.friendly('push'));
        });

    });

});
