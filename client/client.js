var Projects = new Meteor.Collection('Projects');
var Concerns = new Meteor.Collection('Concerns');
var Alphas = new Meteor.Collection('Alphas');
var States = new Meteor.Collection('States');

Meteor.autosubscribe(function () {
  Meteor.subscribe('Projects', Meteor.userId());
  Meteor.subscribe('Concerns');
  Meteor.subscribe('Alphas');
  Meteor.subscribe('States');
});

  Meteor.startup(function() {
    resizeGraphDivs();
  });

  Meteor.autorun(function () {
    if (!Meteor.userId()) {
      Session.set('selectedProjectId', null);
      Session.set('selectedProjectName', null);
    }
  });

  var updateConcernCompletions = function() {
      var concerns = Concerns.find({});
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
      var alphas = Alphas.find({});
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

  var query = Concerns.find({});
  var handle = query.observe({
    changed: function(concern) {
      drawGraphs(Session.get('selectedProjectId'));
    }
  });

