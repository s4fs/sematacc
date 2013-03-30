/**
 * Copyright (C) 2013  Daniel Graziotin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
            Projects.update({_id: projectId}, {$set: {name: name, description: description}});
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

      var isUserSure = window.confirm("Are you sure you want to delete this Project?");
      if (!isUserSure)
         return;

      var project_id = $(event.currentTarget).parent().parent().attr('for');
      if (Session.equals('selectedProjectId', project_id)) {
         Session.set('selectedProjectId', null);
         Session.set('selectedProjectName', null);
      }
      Projects.remove(project_id);

      projectsCount = Projects.find({userId: Meteor.userId()}).count();
      if (projectsCount === 0) {
      Meteor.call('newProject', 'Default Project', 'This is the default description of the project. Feel free to edit it.', Meteor.userId(),
        function(error, result) {
          if (error) {
            alert('Error when creating the default project: ' + error);
          }
        });
   }
   }
});