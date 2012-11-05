Meteor.startup(function () {
  if(Concerns.find().count() === 0) {
    setup();
  }

  Meteor.methods({
    setup: function () {
      return setup();
    },
    new_project : function(name, description, user_id) {
      return new_project(name, description, user_id);
    }
  });
});