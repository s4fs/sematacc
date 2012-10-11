var Kernel = new Meteor.Collection("Kernel");
var Concerns = new Meteor.Collection("Concerns");
var Alphas = new Meteor.Collection("Alphas");
var States = new Meteor.Collection("States");

Meteor.publish("Kernel", function() {
    return Kernel.find({});
  });
  Meteor.publish("Concerns", function() {
    return Concerns.find({});
  });
  Meteor.publish("Alphas", function() {
    return Alphas.find({});
  });
  Meteor.publish("States", function() {
    return States.find({});
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
