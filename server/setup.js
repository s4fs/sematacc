var Alphas = new Meteor.Collection("Alphas");

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Alphas.find().count === 0) {
      setup();
    }
  });

  Meteor.methods({
    setup: function() {
      return setup();
    }
  });
}

/*
  // Publish complete set of lists to all clients.
  Meteor.publish('alphas', function () {
    return Alphas.find();
  });
}
*/

function get_concern(name) {
  return Alphas.findOne({
    name: name
  });
}

function get_alphas(concern_name) {
  return Alphas.find({
    concern: concern_name
  });
}


function setup() {
  Alphas.remove({});
  Meteor.flush();
  var alphas = [
    {
      concern: "Customer",
      name: "Opportunity",
      current_state: null,
      states: ["Identified", "Solution Needed", "Value Established", "Viable", "Addressed", "Benefit Accrued"]
    },
    {
      concern: "Customer",
      name: "Stakeholders",
      current_state: null,
      states: ["Recognized", "Represented", "Involved", "In Agreement", "Satisfied for Deployment", "Satisfied in Use"]
    },
    {
      concern: "Solution",
      name: "Requirements",
      current_state: null,
      states: ["Conceived", "Buonded", "Coehrent", "Acceptable", "Addressed", "Fulfilled"]
    },
    {
      concern: "Solution",
      name: "Software System",
      states: ["Architecture Selected", "Demonstrable", "Usable", "Ready", "Operational", "Retired"]
    },
    {
      concern: "Endeavor",
      name: "Work",
      current_state: null,
      states: ["Initiated", "Prepared", "Started", "Under Control", "Concluded", "Closed"]
    },
    {
      concern: "Endeavor",
      name: "Team",
      current_state: null,
      states: ["Seeded", "Formed", "Collaborating", "Performing", "Adjourned"]
    },
    {
      concern: "Endeavor",
      name: "Way of Working",
      current_state: null,
      states: ["Principles Established", "Foundation Established", "In Use", "In Place", "Working Well", "Retired"]
    }
  ];

  var i = 0;
  for (i = 0; i < alphas.length; i++) {
    Alphas.insert(alphas[i]);
  }
  Meteor.flush();
}
