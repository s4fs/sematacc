if (Meteor.isClient) {
  Template.dashboard.events({
    'click input.setup': function() {
      Meteor.call('setup');
    },
    'click input.status': function() {
    },
    'click input.drop': function() {
      Kernel.remove({});
      Concerns.remove({});
      Alphas.remove({});
      States.remove({});
    }
  });

}