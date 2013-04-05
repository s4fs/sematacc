/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Define the ACLs for each model.
 */
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

/**
 * Publish the collections of the models, to the connected client.
 */
Meteor.publish('Events', function() {
  return Events.find({
    userId: this.userId
  }, {});
});
Meteor.publish('Projects', function() {
  return Projects.find({
    userId: this.userId
  }, {});
});
Meteor.publish('Concerns', function() {
  return Concerns.find({
    userId: this.userId
  }, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish('Alphas', function() {
  return Alphas.find({
    userId: this.userId
  }, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish('States', function() {
  return States.find({
    userId: this.userId
  }, {
    sort: {
      order: 1
    }
  });
});

/**
 * Register the 'public' methods available to the client
 */
Meteor.methods({
  newProject: function(name, description) {
    return newProject(name, description);
  },
  updateAlphasCompletions: function() {
    return updateAlphasCompletions();
  },
  updateConcernCompletions: function() {
    return updateConcernCompletions();
  },
  log: function(projectId, who, what) {
    return log(projectId, who, what);
  },
  getLog: function(projectId) {
    return getLog(projectId);
  }
});