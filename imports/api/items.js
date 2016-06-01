import { Mongo } from 'meteor/mongo';

//db connection
export const Items = new Mongo.Collection('items');
