Template.dashboard.events({
   'click a#showNewProject': function(event) {
      event.preventDefault();
      Session.set('editProjectId', null);
      $('input#nameNewProject').val("");
      $('textarea#descriptionNewProject').val("");
      $('button#makeNewProject').html('Add');
      $('div.newProject').show('400');
   },

   'click button#makeNewProject': function(event) {
      event.preventDefault();
      var name = $('input#nameNewProject').val();
      var description = $('textarea#descriptionNewProject').val();
      if (name && description) {
         var projectId = Session.get('editProjectId');
         if (projectId) {
            Projects.update({_id: projectId, userId: Meteor.userId()}, {$set: {name: name, description: description}});
            Session.set('editProjectId', null);
         } else {
            Meteor.call('newProject', name, description, Meteor.userId(),
               function(error, result) {
                  if (error) {
                     alert('Error when creating project: ' + error);
                  }
            });
         }
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

   'click .accordionlabel': function(event) {
    if (!$('input#' + this._id).attr('checked')) {
      $('input.accordionitem').removeAttr('checked');
    } else {
      setTimeout(function() {
        $('input.accordionitem').removeAttr('checked');
      }, 100);
    }
  },

   'click a.viewProject': function(event) {
      event.preventDefault();
      var project_id = $(event.currentTarget).parent().parent().attr('for');
      Session.set('selectedProjectId', project_id);
      var project_name = Projects.findOne({_id: project_id, userId: Meteor.userId()});
      Session.set('selectedProjectName', project_name.name);
   },

   'click a.editProject': function(event) {
      event.preventDefault();
      var project_id = $(event.currentTarget).parent().parent().attr('for');
      Session.set('editProjectId', project_id);
      var project = Projects.findOne({_id: project_id, userId: Meteor.userId()});
      $('input#nameNewProject').val(project.name);
      $('textarea#descriptionNewProject').val(project.description);
      $('button#makeNewProject').html('Edit');
      $('div.newProject').show(400);
   },

   'click a.deleteProject': function(event) {
      event.preventDefault();
      var project_id = $(event.currentTarget).parent().parent().attr('for');
      if (Session.equals('selectedProjectId', project_id)) {
         Session.set('selectedProjectId', null);
         Session.set('selectedProjectName', null);
      }
      Projects.remove({_id: project_id});
   }
});