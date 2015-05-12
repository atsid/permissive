'use strict';
let chai = require('chai'),
    links = require('./links');

describe('links.js', () => {

    let items = [{
        href: '/api/items/1',
        rel: 'edit',
        method: 'PUT'
    }, {
        href: '/api/items/1',
        rel: 'self',
        method: 'GET'
    }, {
        href: '/api/items/1',
        rel: 'remove',
        method: 'DELETE'
    }];

    describe('findByRel', () => {

        it('finds link by rel', () => {

            let link = links.findByRel(items, 'edit');

            chai.assert.equal('/api/items/1', link.href);
            chai.assert.equal('edit', link.rel);
            chai.assert.equal('PUT', link.method);

        });

        it('returns undefined with non-existent rel', () => {

            let link = links.findByRel(items, 'collection');

            chai.assert.isUndefined(link);

        });

    });

});
