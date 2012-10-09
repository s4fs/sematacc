var Alphas = new Meteor.Collection("Alphas");

if (Meteor.isClient) {

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
/*
Meteor.subscribe('lists', function () {
  if (!Session.get('list_id')) {
    var list = Lists.findOne({}, {sort: {name: 1}});
    if (list)
      Router.setList(list._id);
  }
});
*/

  Template.kernel.greeting = function() {
    return "Welcome to sematps.";
  };

  Template.kernel.concerns = function() {
    return [
      "Customer",
      "Solution",
      "Endeavor"
    ];
  };

  Template.kernel.alphas = function(concern_name){
    return Alphas.find({
    concern: concern_name
  });
  };

  var rendered = 0;
  Template.kernel.rendered = function() {
    //TODO: a strange bug of the accordion
    if (rendered > 6){
      $(".topnav").accordion({
        accordion: true,
        speed: 500,
        closedSign: '[+]',
        openedSign: '[-]'
      });
    }
    rendered++;
  };

  Template.kernel.events({
    'click input.setup': function() {
      Meteor.call('setup');
    },
    'click input.status': function() {
      alert(Alphas.findOne().name);
      alert(rendered);
    },
    'click input.drop': function() {
      Alphas.remove({});
    },
    'click .checkit': function() {
      //States.update(this._id, {$set: {checked: !this.checked}});
    }
  });

}
