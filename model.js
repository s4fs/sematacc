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
    Meteor.subscribe('Projects', Meteor.userId());
    Meteor.subscribe('Concerns');
    Meteor.subscribe('Alphas');
    Meteor.subscribe('States');
  });
}
