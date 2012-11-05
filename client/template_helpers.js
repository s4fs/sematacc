Handlebars.registerHelper('selected_project',function(input){
  var selected_project_id = Session.get('selected_project_id');
  //TODO automatic selection of the first project
  /*
  projects_count = Projects.find({user_id: this.userId}).count();

  if (selected_project_id == null && projects_count === 1) {
    selected_project_id = Projects.findOne({user_id: this.userId})._id;
    Session.set('selected_project_id', selected_project_id);
  }
  */
  return selected_project_id;
});

Handlebars.registerHelper('current_user',function(input){
  return this.userId;
});
