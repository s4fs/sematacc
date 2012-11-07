var updateConcernCompletions = function() {
    var concerns = Concerns.find({userId: Meteor.userId()});
    concerns.forEach(function(concern) {
      var alphas = Alphas.find({
        concernId: concern._id,
        userId: Meteor.userId()
      }).fetch();
      var completions = 0;
      alphas.forEach(function(alpha) {
        completions += alpha.completion;
      });
      Concerns.update({
        _id: concern._id,
        userId: Meteor.userId()
      }, {
        $set: {
          completion: completions / alphas.length
        }
      });
    });
  };

var updateAlphasCompletions = function() {
    var alphas = Alphas.find({userId: Meteor.userId()});
    alphas.forEach(function(alpha) {
      var alphaStatesCount = States.find({
        alphaId: alpha._id,
        userId: Meteor.userId()
      }).count();

      var currentStatePosition = 0;
      if (alpha.currentStateId) {
        currentStatePosition = States.findOne({
          _id: alpha.currentStateId,
          userId: Meteor.userId()
        }).order;
      }

      var ratio = currentStatePosition / alphaStatesCount * 100;
      Alphas.update({
        _id: alpha._id,
        userId: Meteor.userId()
      }, {
        $set: {
          completion: ratio
        }
      });
    });
};