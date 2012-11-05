var newProject = function(name, description, userId) {

  var concernId = 0;
  var alphaId = 0;
  var stateId = 0;

  var alphaCounter = 0;

  projectId = Projects.insert({
    name: name,
    description: description,
    userId: userId
  });

  for (var c = 0; c < kernelSkeleton.concerns.length; c++) {
    var concern = kernelSkeleton.concerns[c];
    concernId = Concerns.insert({
      name: concern.name,
      description: concern.description,
      // index from 1 instead of 0
      order: c + 1,
      completion: 0,
      userId: userId,
      projectId: projectId
    });
    for (var a = 0; a < concern.alphas.length; a++) {
      var alpha = concern.alphas[a];
      alphaId = Alphas.insert({
        name: alpha.name,
        description: alphaDescriptions[alpha.name.toLowerCase()],
        order: alphaCounter + 1,
        currentStateId: null,
        completion: 0,
        concernId: concernId,
        projectId: projectId,
        userId: userId
      });
      alphaCounter++;
      for (var s = 0; s < alpha.states.length; s++) {
        var state = alpha.states[s];
        stateId = States.insert({
          name: state,
          description: stateDescriptions[alpha.name.toLowerCase()][state.toLowerCase()],
          order: s + 1,
          alphaId: alphaId,
          projectId: projectId,
          userId: userId
        });
      }
    }
  }

  return projectId;
};

function setup() {
  Projects.remove({});
  Kernel.remove({});
  Concerns.remove({});
  Alphas.remove({});
  States.remove({});
}
