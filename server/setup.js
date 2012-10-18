var Kernel = new Meteor.Collection("Kernel");
var Concerns = new Meteor.Collection("Concerns");
var Alphas = new Meteor.Collection("Alphas");
var States = new Meteor.Collection("States");

// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'owner' field on each
// document. All documents must be owned by the user that created
// them and ownership can't be changed. Only a document's owner
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

States.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function(doc) {
      return true;//doc.owner === userId;
    });
  },
  //fetch: ['owner']
});

Alphas.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function(doc) {
      return true;//doc.owner === userId;
    });
  },
  //fetch: ['owner']
});

Concerns.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function(doc) {
      return true;//doc.owner === userId;
    });
  },
  //fetch: ['owner']
});




Meteor.publish("Kernel", function() {
    return Kernel.find({},{});
  });
  Meteor.publish("Concerns", function() {
    return Concerns.find({},{sort: {order: 1}});
  });
  Meteor.publish("Alphas", function() {
    return Alphas.find({},{sort: {order: 1}});
  });
  Meteor.publish("States", function() {
    return States.find({},{sort: {order: 1}});
  });

if (Meteor.isServer) {

  Meteor.startup(function() {
    if (Concerns.find().count() === 0) {
      setup();
    }
  });

  Meteor.methods({
    setup: function() {
      return setup();
    }
  });

  function get_alphas(concern_name) {
    return Kernel.find({
      concern: concern_name
    });
  }
}
