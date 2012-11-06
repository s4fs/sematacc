Template.dashboard.userProjects = function() {
   var projects = Projects.find({userId: Meteor.userId()});
   if (projects.count() === 0)
      return null;
   else
      return projects;
};

Template.dashboard.rendered = function() {
   $('input#nameNewProject').watermark('Project Name');
   $('textarea#descriptionNewProject').watermark('Project Description');
};
