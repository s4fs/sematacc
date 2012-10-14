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

  // React to Session["selected_alpha_id"] changes
  var onAlphaSelected = function() {
      var update = function() {
          var ctx = new Meteor.deps.Context(); // invalidation context
          ctx.onInvalidate(update); // rerun update() on invalidation
          ctx.run(function() {
            var alpha_id = Session.get("selected_alpha_id");
            if (!alpha_id) return;
            $("input.accordionitem").attr("checked", false);
            $("#" + alpha_id).attr("checked", true);
          });
        };
      update();
    };
  onAlphaSelected();

  Template.kernel.concerns = function() {
    return Concerns.find();
  };

  Template.kernel.alphas = function(concern_id) {
    return Alphas.find({
      concern_id: concern_id
    });
  };

  Template.kernel.current_state = function(state_id) {
    var state = States.findOne({
      _id: state_id
    });
    if(state) return ": " + state.name;
    else return "";
  };

  Template.kernel.states = function(alpha_id) {
    if(alpha_id) return States.find({
      alpha_id: alpha_id
    });
    else return States.find();
  };

  Template.kernel.same_id = function(first_id, second_id) {
    return first_id == second_id;
  };

  Template.kernel.checkable = function(alpha_id) {
    if(alpha_id == Session.get("selected_alpha_id")) return true;
    else return false;
  };

  var time_out;
  Template.kernel.events({
    "mouseenter .accordionlabel": function(event) {
      $('#message').text(Concerns.findOne(this.concern_id).name);
    },
    "mouseleave .ac-container": function(event) {
      $('#message').text("");
    },
    'click .accordionitem': function(event) {
      //TODO setting selected_alpha_id here makes the effect vanish
      $("input.accordionitem").attr("checked", false);
      $("#" + this._id).attr("checked", true);
      if(time_out) {
        window.clearTimeout(time_out);
      }
      $("div.bubble").fadeOut("slow");
    },
    'click li.selectable': function(event) {
      event.preventDefault();

      if(time_out) {
        window.clearTimeout(time_out);
      }
      $("div.bubble").fadeOut("slow");

      Session.set("selected_alpha_id", this.alpha_id);

      var alpha_states_count = States.find({
        alpha_id: this.alpha_id
      }).count();
      var current_state_position = States.findOne({
        _id: this._id
      }).order;

      var ratio = current_state_position / alpha_states_count * 100;
      Alphas.update({
        _id: this.alpha_id
      }, {
        $set: {
          completion: ratio,
          current_state_id: this._id
        }
      });
    },
    'mouseenter li.item': function(event) {
      time_out = window.setTimeout(function() {
        var offset = $(event.target).offset();
        var bubble_height = $("div.bubble").height();
        offset = offset.top - 110 - 100;
        $("div.bubble").css("margin-top", offset + "px");
        $("div.bubble").fadeIn("slow");
      }, 1000);
    },
    'mouseleave li.item': function(event) {
      if (time_out) {
        window.clearTimeout(time_out);
      }
      $("div.bubble").fadeOut("slow");
    }
  });

  var query = Alphas.find({});
  var handle = query.observe({
    changed: function(alpha) {
      draw_graph();
    }
  });
}