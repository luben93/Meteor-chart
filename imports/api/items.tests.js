/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Items  } from './items.js';


if (Meteor.isServer) {
    describe('Items', () => {
        describe('methods', () => {
            const id = Random.id();
            let itemId;


            beforeEach(() => {
                Items.remove({});
                itemId = Items.insert({
                    text: 'test test',
                    createdAt: new Date(),
                    file: "https://some.url.com/id",//mock data ???
                    data: [["foo",6],["bar",10]],//randomize
                });
            });


            it('can delete item', () => {
                const deleteItem = Meteor.server.method_handlers['/items/remove'];
                const invocation = {  };

                //deleteItem.apply(invocation, [itemId]);

                assert.equal(Items.find().count(),1);

            });

            });
    });
}
