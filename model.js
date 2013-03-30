/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
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
    update: function(userId, doc, fields, modifier) {
        return doc.userId === userId;
    },
    remove: function(userId, doc) {
        return doc.userId === userId;
    },
    fetch: ['userId']
  });
  Concerns.allow({
    update: function(userId, doc, fields, modifier) {
      // can only change your own documents
        return doc.userId === userId;
    },
    fetch: ['userId']
  });
  Alphas.allow({
    update: function(userId, doc, fields, modifier) {
      // can only change your own documents
        return doc.userId === userId;
    },
    fetch: ['userId']
  });
  States.allow({
    update: function(userId, doc, fields, modifier) {
      // can only change your own documents
        return doc.userId === userId;
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
