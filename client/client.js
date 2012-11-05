var Kernel = new Meteor.Collection('Kernel');
var Projects = new Meteor.Collection('Projects');
var Concerns = new Meteor.Collection('Concerns');
var Alphas = new Meteor.Collection('Alphas');
var States = new Meteor.Collection('States');

  Meteor.startup(function() {
    Meteor.subscribe('Projects');
    Meteor.subscribe('Kernel');
    Meteor.subscribe('Concerns');
    Meteor.subscribe('Alphas');
    Meteor.subscribe('States', draw_graphs);
    resize_graph_divs();
  });

  // React to Session["selected_alpha_id"] changes
  var onAlphaSelected = function() {
      var update = function() {
          var ctx = new Meteor.deps.Context(); // invalidation context
          ctx.onInvalidate(update); // rerun update() on invalidation
          ctx.run(function() {
            var alpha_id = Session.get('selected_alpha_id');
            if (!alpha_id) return;
            $('input.accordionitem').attr('checked', false);
            $('#' + alpha_id).attr('checked', true);
          });
        };
      update();
    };
  onAlphaSelected();

  var update_concern_completions = function() {
      var concerns = Concerns.find({});
      concerns.forEach(function(concern) {
        var alphas = Alphas.find({
          concern_id: concern._id
        }).fetch();
        var completions = 0;
        alphas.forEach(function(alpha) {
          completions += alpha.completion;
        });
        Concerns.update({
          _id: concern._id
        }, {
          $set: {
            completion: completions / alphas.length
          }
        });
      });
    };

  var update_alphas_completions = function() {
      var alphas = Alphas.find({});
      alphas.forEach(function(alpha) {
        var alpha_states_count = States.find({
          alpha_id: alpha._id
        }).count();

        var current_state_position = 0;
        if (alpha.current_state_id) {
          current_state_position = States.findOne({
            _id: alpha.current_state_id
          }).order;
        }

        var ratio = current_state_position / alpha_states_count * 100;
        Alphas.update({
          _id: alpha._id
        }, {
          $set: {
            completion: ratio
          }
        });
      });
    };

  var query = Concerns.find({});
  var handle = query.observe({
    changed: function(alpha) {
      draw_graphs();
    }
  });

