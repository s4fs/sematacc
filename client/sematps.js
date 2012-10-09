var Alphas = new Meteor.Collection("Alphas");

if (Meteor.isClient) {

  Template.console.greeting = function() {
    return "Welcome to sematps.";
  };

  Template.console.concerns = function() {
    return [
      "Customer",
      "Solution",
      "Endeavor"
    ];
  };

  Template.console.alphas = function(concern_name){
    return Alphas.find({
    concern: concern_name
  });
  };

  Template.console.rendered = function() {
    $(".topnav").accordion({
      accordion: false,
      speed: 500,
      closedSign: '[+]',
      openedSign: '[-]'
    });
  };

  Template.console.events({
    'click input.setup': function() {
      Meteor.call('setup');
    },
    'click input.status': function() {
      alert(Alphas.findOne().name);
    },
    'click .checkit': function() {
      //States.update(this._id, {$set: {checked: !this.checked}});
    }
  });

}
