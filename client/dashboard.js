Template.dashboard.userProjects = function() {
   return Projects.find({
      userId: this.userId
   });
};

Template.dashboard.events({
   'click a#showNewProject': function(event) {
      event.preventDefault();
      $('div.newProject').show(400);
   },

   'click button#makeNewProject': function(event) {
      event.preventDefault();
      var name = $('input#nameNewProject').val();
      var description = $('textarea#descriptionNewProject').val();
      if (name && description) {
         Meteor.call('newProject', name, description, this.userId,
            function(error, result) {
               if (error) {
                  alert('Error when creating project: ' + error);
               }
         });
         $('div.newProject').hide(400);
      }
   },

   'mouseenter .accordionlabel': function(event) {
      var project_id = $(event.currentTarget).attr('for');
      $('#projectCommands' + this._id).show();
   },

   'mouseleave .accordionlabel': function(event) {
     $('.projectCommands').hide();
   },

   'click .accordionitem': function(event) {
     $('input.accordionitem').attr('checked', false);
     $('#' + this._id).attr('checked', true);
   },

   'click a.viewProject': function(event) {
      event.preventDefault();
      var project_id = $(event.currentTarget).parent().parent().attr('for');
      Session.set('selectedProjectId', project_id);
      var project_name = Projects.findOne({_id: project_id, userId: this.userId});
      Session.set('selectedProjectName', project_name.name);
   },

   'click a.deleteProject': function(event) {
      event.preventDefault();
      var project_id = $(event.currentTarget).parent().parent().attr('for');
      if (Session.equals('selectedProjectId', project_id)){
         Session.set('selectedProjectId', null);
         Session.set('selectedProjectName', null);
      }
      Projects.remove({_id: project_id});
   },
});

Template.dashboard.rendered = function(){
   $('input#nameNewProject').watermark('Project Name');
   $('textarea#descriptionNewProject').watermark('Project Description');
};