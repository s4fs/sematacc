Handlebars.registerHelper('selectedProjectId',function(input){
  var selectedProjectId = Session.get('selectedProjectId');
  return selectedProjectId;
});

Handlebars.registerHelper('selectedProjectName',function(input){
  var selectedProjectName = Session.get('selectedProjectName');
  return selectedProjectName;
});
