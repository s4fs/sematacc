var Kernel = new Meteor.Collection("Kernel");
var Concerns = new Meteor.Collection("Concerns");
var Alphas = new Meteor.Collection("Alphas");
var States = new Meteor.Collection("States");

if (Meteor.isClient) {

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
/*
Meteor.subscribe('lists', function () {
  if (!Session.get('list_id')) {
    var list = Lists.findOne({}, {sort: {name: 1}});
    if (list)
      Router.setList(list._id);
  }
});
*/

  Template.kernel.greeting = function() {
    return "Welcome to sematps.";
  };

  Template.kernel.concerns = function() {
    return Concerns.find();
  };

  Template.kernel.alphas = function(concern_id) {
    return Alphas.find({concern_id: concern_id});
  };

  Template.kernel.states = function(alpha_id) {
    return States.find({alpha_id: alpha_id});
  };



  var rendered = 0;
  Template.kernel.rendered = function() {
    //TODO: a strange bug of the accordion
    //if (rendered > 6) {
      $(".topnav").accordion({
        accordion: true,
        speed: 500,
        closedSign: '[+]',
        openedSign: '[-]'
      });
    //}
    rendered++;
  };

  Template.kernel.events({
    'click input.setup': function() {
      Meteor.call('setup');
    },
    'click input.status': function() {
      alert(Kernel.findOne());
      Meteor._debug("asd");
      alert(rendered);
    },
    'click input.drop': function() {
      Kernel.remove({});
    },
    'click .checkit': function(event) {
      event.preventDefault();
      Alphas.update(this.alpha_id, {$set: {current_state: this._id}});
    }
  });

}
