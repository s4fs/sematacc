Handlebars.registerHelper('selectedProjectId',function(input){
  var selectedProjectId = Session.get('selectedProjectId');
  return selectedProjectId;
});

Handlebars.registerHelper('isLoggedIn',function(input){
  return this.userId;
});
