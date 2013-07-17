/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

Meteor.startup(function() {
    if (Projects.find({
        demo: true
    }).count() === 0) {
        Meteor.call('newProject', 'Demo Project', 'This is a demo project.', true);
    }
});

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
Meteor.publish('Projects', function() {
    return Projects.find({
        $or: [{
            userId: this.userId
        }, {
            demo: true
        }]
    });
});

Meteor.publish('Concerns', function(projectId) {
    return Concerns.find({
        projectId: projectId
    }, {
        sort: {
            order: 1
        }
    });
});

Meteor.publish('Alphas', function(projectId) {
    return Alphas.find({
        projectId: projectId
    }, {
        sort: {
            order: 1
        }
    });
});

Meteor.publish('States', function(projectId) {
    return States.find({
        projectId: projectId
    }, {
        sort: {
            order: 1
        }
    });
});

Meteor.publish('Events', function() {
    return Events.find({
        userId: this.userId
    }, {});
});

/**
 * Register the 'public' methods available to the client
 */
Meteor.methods({
    newProject: function(name, description, demo) {
        return newProject(name, description, demo);
    },
    updateAlphasCompletions: function(projectId) {
        return updateAlphasCompletions(projectId);
    },
    updateConcernCompletions: function(projectId) {
        return updateConcernCompletions(projectId);
    },
    log: function(projectId, who, what) {
        return log(projectId, who, what);
    },
    getLog: function(projectId) {
        return getLog(projectId);
    }
});
