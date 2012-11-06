Meteor.publish("Projects", function (userId) {
  return Projects.find({userId: userId}, {});
});
Meteor.publish("Concerns", function () {
  return Concerns.find({userId: Meteor.userId}, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish("Alphas", function () {
  return Alphas.find({userId: Meteor.userId}, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish("States", function () {
  return States.find({userId: Meteor.userId}, {
    sort: {
      order: 1
    }
  });
});

States.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function (doc) {
      return doc.userId === userId;
    });
  },
  fetch: ['userId']
});

Alphas.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function (doc) {
      return doc.userId === userId;
    });
  },
  fetch: ['userId']
});

Concerns.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function (doc) {
      return doc.userId === userId;
    });
  },
  fetch: ['userId']
});

Projects.allow({
  update: function (userId, docs, fields, modifier) {
    Meteor._debug("can we?" +  userId);
    return _.all(docs, function (doc) {
      return doc.userId === userId;
    });
  },
  remove: function (userId, docs) {
    return _.all(docs, function(doc) {
      return doc.userId === userId;
    });
  },
  fetch: ['userId']
});
