var Kernel = new Meteor.Collection("Kernel");
var Concerns = new Meteor.Collection("Concerns");
var Alphas = new Meteor.Collection("Alphas");
var States = new Meteor.Collection("States");

if (Meteor.isClient) {

  Meteor.startup(function() {
    Meteor.subscribe("Kernel");
    Meteor.subscribe("Concerns");
    Meteor.subscribe("Alphas");
    Meteor.subscribe("States", draw_graph);
  });

  Template.dashboard.greeting = function() {
    return "Welcome to sematps.";
  };

  Template.kernel.concerns = function() {
    return Concerns.find();
  };

  Template.kernel.alphas = function(concern_id) {
    return Alphas.find({
      concern_id: concern_id
    });
  };

  Template.kernel.current_state = function(state_id){
    var state = States.findOne({_id: state_id});
    if (state)
      return ": " + state.name;
    else
      return "";
  };

  Template.kernel.states = function(alpha_id) {
    return States.find({
      alpha_id: alpha_id
    });
  };

  Template.kernel.events({
    'click .checkit': function(event) {
      event.preventDefault();

      var alpha_states_count = States.find({alpha_id: this.alpha_id}).count();
      var current_state_position = States.findOne({_id: this._id}).order;

      var ratio = current_state_position / alpha_states_count * 100;
      Alphas.update({_id: this.alpha_id}, {$set: {completion: ratio, current_state_id: this._id}});
    },

    // Fixes a bug
    'click .section': function(event) {
      draw_graph();
    }
    //'mouseenter .checkit': function(event) {
      //$("#hints").toggle('slow');
      //TODO
    //}
  });

  var query = Alphas.find({});
  var handle = query.observe({
    changed: function(alpha) {
      draw_graph();
    }
  });

}