var Kernel = new Meteor.Collection("Kernel");
var Concerns = new Meteor.Collection("Concerns");
var Alphas = new Meteor.Collection("Alphas");
var States = new Meteor.Collection("States");

if (Meteor.isClient) {

  Meteor.startup(function() {
    Meteor.subscribe("Kernel");
    Meteor.subscribe("Concerns");
    Meteor.subscribe("Alphas");
    Meteor.subscribe("States");
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
  }

  Template.kernel.states = function(alpha_id) {
    return States.find({
      alpha_id: alpha_id
    });
  };

  Template.graph.rendered = function() {
    var elem_id = 'cvs';
    var data = [4, 6, 2, 8, 9, 5, 4];
    var labels = ['Stakeholders', 'Opportunity', 'Software System', 'Requirements', 'Way of Working', 'Team', 'Work'];
    graph(elem_id, data, labels);
  };

  function graph_alphas(elem_id){
    var alphas = Alphas.find({}).fetch();
    var data = [];
    var labels = [];
    alphas.forEach(function(alpha){
      data.push(alpha.completion);
      labels.push(alpha.name);
    });
    graph(elem_id, data, labels);
  }

  function graph(elem_id, data, labels) {
    var rose2 = new RGraph.Rose(elem_id, data);
    rose2.Set('chart.colors.alpha', 0.5);
    rose2.Set('chart.labels', labels);
    rose2.Set('chart.tooltips', labels);
    rose2.Set('chart.labels.axes', '');
    rose2.Set('chart.background.grid.spokes', 8);
    rose2.Set('chart.background.axes', false);
    rose2.Set('chart.colors.sequential', true);
    rose2.Set('chart.margin', 2);
    rose2.Draw();
    return rose2;
  }


  Template.kernel.events({
    'click input.setup': function() {
      Meteor.call('setup');
    },
    'click input.status': function() {
      alert(Kernel.findOne());
      alert(rendered);
    },
    'click input.drop': function() {
      Kernel.remove({});
      Concerns.remove({});
      Alphas.remove({});
      States.remove({});
    },
    'click .checkit': function(event) {
      event.preventDefault();

      var alpha_states_count = States.find({alpha_id: this.alpha_id}).count();
      var current_state_position = States.findOne({_id: this._id}).order;

      var ratio = current_state_position / alpha_states_count * 100;
      Alphas.update({_id: this.alpha_id}, {$set: {completion: ratio, current_state_id: this._id}});
    },
    'mouseenter .checkit': function(event) {
      //$("#hints").toggle('slow');
      //TODO
    }
  });

  // Keep track of how many administrators are online.
  var count = 0;
  var query = Alphas.find({});
  
  var handle = query.observe({
    changed: function(alpha) {
      graph_alphas('cvs');
    }
  });
  

}