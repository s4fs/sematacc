Meteor.startup(function () {
  Meteor.methods({
    newProject : function(name, description, userId) {
      return newProject(name, description, userId);
    }
  });
});