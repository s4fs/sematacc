
Meteor.startup(function() {
  resizeGraphDivs();
});

Meteor.autorun(function() {
  if (!Meteor.userId()) {
    Session.set('selectedProjectId', null);
    Session.set('selectedProjectName', null);
  }
  var query = Concerns.find({
    userId: Meteor.userId()
  });
  var handle = query.observe({
    changed: function(concern) {
      drawGraphs(Session.get('selectedProjectId'));
    }
  });
});

Handlebars.registerHelper('selectedProjectId', function(input) {
  var selectedProjectId = Session.get('selectedProjectId');
  return selectedProjectId;
});

Handlebars.registerHelper('selectedProjectName', function(input) {
  var selectedProjectName = Session.get('selectedProjectName');
  return selectedProjectName;
});
