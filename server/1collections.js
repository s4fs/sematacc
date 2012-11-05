var Projects = new Meteor.Collection("Projects");
var Kernel = new Meteor.Collection("Kernel");
var Concerns = new Meteor.Collection("Concerns");
var Alphas = new Meteor.Collection("Alphas");
var States = new Meteor.Collection("States");

Meteor.publish("Projects", function () {
  return Projects.find({user_id: Meteor.userId}, {});
});

Meteor.publish("Kernel", function () {
  return Kernel.find({}, {});
});
Meteor.publish("Concerns", function () {
  return Concerns.find({}, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish("Alphas", function () {
  return Alphas.find({}, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish("States", function () {
  return States.find({}, {
    sort: {
      order: 1
    }
  });
});