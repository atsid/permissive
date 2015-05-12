'use strict';
let chai = require('chai'),
    hash = require('./hash');

describe('hash.js', () => {

    let items = [{
        id: 'item1',
        value: 1
    }, {
        id: 'item2',
        value: 2
    }, {
        id: 'item3',
        value: 3
    }];

    it('creates hash from array', () => {

        let hashed = hash(items, 'id');

        chai.assert.equal(1, hashed.item1.value);
        chai.assert.equal(2, hashed.item2.value);
        chai.assert.equal(3, hashed.item3.value);

        chai.assert.isUndefined(hashed.item4);

    });
});
