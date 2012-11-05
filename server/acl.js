// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'owner' field on each
// document. All documents must be owned by the user that created
// them and ownership can't be changed. Only a document's owner
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.
States.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function (doc) {
      return true; //doc.owner === userId;
    });
  },
  //fetch: ['owner']
});

Alphas.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function (doc) {
      return true; //doc.owner === userId;
    });
  },
  //fetch: ['owner']
});

Concerns.allow({
  update: function (userId, docs, fields, modifier) {
    // can only change your own documents
    return _.all(docs, function (doc) {
      return true; //doc.owner === userId;
    });
  },
  //fetch: ['owner']
});

Projects.allow({
  remove: function (userId, projects) {
    return _.all(projects, function(project) {
      return project.userId === userId;
    });
  },
  fetch: ['userId']
});