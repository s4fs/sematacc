/**
 * Copyright (C) 2013  Daniel Graziotin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var Projects = new Meteor.Collection('Projects');
var Concerns = new Meteor.Collection('Concerns');
var Alphas = new Meteor.Collection('Alphas');
var States = new Meteor.Collection('States');

// publish
if (Meteor.isServer) {
  Meteor.publish('Projects', function(userId) {
    return Projects.find({userId: userId}, {});
  });
  Meteor.publish('Concerns', function() {
    return Concerns.find({userId: Meteor.userId}, {sort: {order: 1}});
  });
  Meteor.publish('Alphas', function() {
    return Alphas.find({userId: Meteor.userId}, {sort: {order: 1}});
  });
  Meteor.publish('States', function() {
    return States.find({userId: Meteor.userId}, {sort: {order: 1}});
  });
  // ACL
  Projects.allow({
    update: function(userId, docs, fields, modifier) {
      return _.all(docs, function(doc) {
        return doc.userId === userId;
      });
    },
    remove: function(userId, docs) {
      return _.all(docs, function(doc) {
        return doc.userId === userId;
      });
    },
    fetch: ['userId']
  });
  Concerns.allow({
    update: function(userId, docs, fields, modifier) {
      // can only change your own documents
      return _.all(docs, function(doc) {
        return doc.userId === userId;
      });
    },
    fetch: ['userId']
  });
  Alphas.allow({
    update: function(userId, docs, fields, modifier) {
      // can only change your own documents
      return _.all(docs, function(doc) {
        return doc.userId === userId;
      });
    },
    fetch: ['userId']
  });
  States.allow({
    update: function(userId, docs, fields, modifier) {
      // can only change your own documents
      return _.all(docs, function(doc) {
        return doc.userId === userId;
      });
    },
    fetch: ['userId']
  });
}

// subscribe
if (Meteor.isClient) {
  Meteor.autosubscribe(function() {
    Meteor.subscribe('Projects', Meteor.userId() ,onProjectSubscription);
    Meteor.subscribe('Concerns');
    Meteor.subscribe('Alphas');
    Meteor.subscribe('States');
  });

  var onProjectSubscription = function() {
  var projects = Projects.find({userId: Meteor.userId()}).count();
   if (projects === 0) {
      Meteor.call('newProject', 'Default Project', 'This is the default description of the project. Feel free to edit it.', Meteor.userId(),
        function(error, result) {
          if (error) {
            alert('Error when creating the default project: ' + error);
          }
        });
   }
  };
}
