if (Meteor.isServer) {

  function setup() {
    Kernel.remove({});
    Concerns.remove({});
    Alphas.remove({});
    States.remove({});

    var k = {
      concerns: [{
        name: "Customer",
        description: "Description of Customer",
        alphas: [{
          name: "Opportunity",
          current_state: null,
          states: ["Identified", "Solution Needed", "Value Established", "Viable", "Addressed", "Benefit Accrued"]
        }, {
          name: "Stakeholders",
          current_state: null,
          states: ["Recognized", "Represented", "Involved", "In Agreement", "Satisfied for Deployment", "Satisfied in Use"]
        }]
      }, {
        name: "Solution",
        description: "Description of Solution",
        alphas: [{
          name: "Requirements",
          current_state: null,
          states: ["Conceived", "Buonded", "Coehrent", "Acceptable", "Addressed", "Fulfilled"]
        }, {
          name: "Software System",
          current_state: null,
          states: ["Architecture Selected", "Demonstrable", "Usable", "Ready", "Operational", "Retired"]
        }]
      }, {
        name: "Endeavor",
        description: "Description of Endeavor",
        alphas: [{
          name: "Work",
          current_state: null,
          states: ["Initiated", "Prepared", "Started", "Under Control", "Concluded", "Closed"]
        }, {
          name: "Team",
          current_state: null,
          states: ["Seeded", "Formed", "Collaborating", "Performing", "Adjourned"]
        }, {
          name: "Way of Working",
          current_state: null,
          states: ["Principles Established", "Foundation Established", "In Use", "In Place", "Working Well", "Retired"]
        }]
      }]
    };

    var concern_id = 0;
    var alpha_id = 0;
    var state_id = 0;
    for (var c = 0; c < k.concerns.length; c++) {
      var concern = k.concerns[c];
      concern_id = Concerns.insert({
        name: concern.name,
        description: concern.description,
        order: c + 1,
        // index from 1 instead of 0
        completion: 0
      });
      for (var a = 0; a < concern.alphas.length; a++) {
        var alpha = concern.alphas[a];
        alpha_id = Alphas.insert({
          name: alpha.name,
          description: "",
          concern_id: concern_id,
          order: a + 1,
          current_state_id: null,
          completion: 0
        });
        for (var s = 0; s < alpha.states.length; s++) {
          var state = alpha.states[s];
          state_id = States.insert({
            name: state,
            description: "",
            alpha_id: alpha_id,
            order: s + 1
          });
        }
      }
    }
  }
}