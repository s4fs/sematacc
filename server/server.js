Meteor.startup(function () {
  if(Concerns.find().count() === 0) {
    setup();
  }

  Meteor.methods({
    setup: function () {
      return setup();
    },
    newProject : function(name, description, userId) {
      return newProject(name, description, userId);
    }
  });
});