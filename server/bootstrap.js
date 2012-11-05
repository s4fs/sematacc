var new_project = function(name, description, user_id) {

  var concern_id = 0;
  var alpha_id = 0;
  var state_id = 0;

  var alpha_counter = 0;

  project_id = Projects.insert({
    name: name,
    description: description,
    user_id: user_id
  });

  for (var c = 0; c < kernel_skeleton.concerns.length; c++) {
    var concern = kernel_skeleton.concerns[c];
    concern_id = Concerns.insert({
      name: concern.name,
      description: concern.description,
      // index from 1 instead of 0
      order: c + 1,
      project_id: project_id,
      completion: 0
    });
    for (var a = 0; a < concern.alphas.length; a++) {
      var alpha = concern.alphas[a];
      alpha_id = Alphas.insert({
        name: alpha.name,
        description: alpha_descriptions[alpha.name.toLowerCase()],
        order: alpha_counter + 1,
        concern_id: concern_id,
        current_state_id: null,
        project_id: project_id,
        completion: 0
      });
      alpha_counter++;
      for (var s = 0; s < alpha.states.length; s++) {
        var state = alpha.states[s];
        state_id = States.insert({
          name: state,
          description: state_descriptions[alpha.name.toLowerCase()][state.toLowerCase()],
          alpha_id: alpha_id,
          order: s + 1,
          project_id: project_id
        });
      }
    }
  }
};

function setup() {
  Projects.remove({});
  Kernel.remove({});
  Concerns.remove({});
  Alphas.remove({});
  States.remove({});
}
